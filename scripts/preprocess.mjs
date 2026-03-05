// preprocess.mjs
import fs from "fs";
import path from "path";
import crypto from "crypto";
import chokidar from "chokidar";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

/* ================= CONFIG ================= */

const SRC_CONTENT = "content";
const BUILD_CONTENT = ".build/content";
const MATH_SVG_DIR = "static/math";
const MATH_TMP_DIR = ".math-tmp";
const TIKZ_SVG_DIR = "static/tikz";
const TIKZ_TMP_DIR = ".tikz-tmp";

/* ================= Regex ================= */

const BLOCK_MATH = /\$\$([\s\S]+?)\$\$/g;
const INLINE_MATH = /\\\((.+?)\\\)/g;

const TIKZ_RE = /{{<\s*tikz(?:\s+([^>]*))?\s*>}}([\s\S]*?){{<\s*\/tikz\s*>}}/g;

/* ================= Utils ================= */

function sha1(str) {
  /**
   * sha1
   * Вычисляет SHA-1 хэш строки.
   *
   * Используется для:
   *  - генерации детерминированных имён SVG
   *  - кэширования компиляции LaTeX/TikZ
   *
   * @param {string} str - Входная строка
   * @returns {string} 40-символьный hex-хэш
   */
  return crypto.createHash("sha1").update(str).digest("hex");
}

function ensureDir(p) {
  /**
   * ensureDir
   * Гарантирует существование директории.
   * Создаёт её рекурсивно, если она отсутствует.
   *
   * Используется перед записью файлов.
   *
   * @param {string} p - Путь к директории
   */
  fs.mkdirSync(p, { recursive: true });
}

function normalizeMathSVG(svg) {
  /**
   * normalizeMathSVG
   * Нормализует SVG, полученный из LaTeX-формулы:
   *  - заменяет fill на currentColor
   *  - заменяет stroke на currentColor
   *
   * Это позволяет управлять цветом формулы через CSS.
   *
   * @param {string} svg - Исходный SVG
   * @returns {string} Нормализованный SVG
   */
  return svg
    .replace(/fill="[^"]*"/g, 'fill="currentColor"')
    .replace(/stroke="[^"]*"/g, 'stroke="currentColor"')
    ;
}

function uniquifySVG(svg, hash) {
  /**
   * uniquifySVG
   * Делает id внутри SVG уникальными,
   * добавляя к ним хэш.
   *
   * Это предотвращает конфликты id,
   * если несколько SVG вставляются на одну страницу.
   *
   * @param {string} svg - Исходный SVG
   * @param {string} hash - Хэш, добавляемый к id
   * @returns {string} SVG с уникализированными id
   */
  return svg
    .replace(/id="([^"]+)"/g, `id="$1-${hash}"`)
    .replace(/xlink:href="#([^"]+)"/g, `xlink:href="#$1-${hash}"`);
}

const compileQueue = [];
let compiling = false;

async function runCompileQueue() {
  /**
   * runCompileQueue
   * Последовательно выполняет задачи компиляции LaTeX/TikZ.
   *
   * Обеспечивает:
   *  - отсутствие гонок pdflatex
   *  - отсутствие параллельных записей SVG
   *  - стабильность сборки
   *
   * Очередь выполняется строго по одной задаче за раз.
   */
  if (compiling) return;
  compiling = true;

  while (compileQueue.length) {
    const job = compileQueue.shift();
    try {
      await job();
    } catch (err) {
      console.error("Compile job error:", err);
    }
  }

  compiling = false;
}

async function replaceAsync(str, regex, asyncFn) {
  /**
   * runCompileQueue
   * Последовательно выполняет задачи компиляции LaTeX/TikZ.
   *
   * Обеспечивает:
   *  - отсутствие гонок pdflatex
   *  - отсутствие параллельных записей SVG
   *  - стабильность сборки
   *
   * Очередь выполняется строго по одной задаче за раз.
   */
  const matches = [...str.matchAll(regex)];

  if (!matches.length) return str;

  const replacements = await Promise.all(
    matches.map(match => asyncFn(...match))
  );

  let result = str;
  for (let i = matches.length - 1; i >= 0; i--) {
    const match = matches[i];
    result =
      result.slice(0, match.index) +
      replacements[i] +
      result.slice(match.index + match[0].length);
  }

  return result;
}

async function processFile(src) {
  /**
   * processFile
   * Обрабатывает один файл из content/.
   *
   * Поведение:
   *  - Если это .md → обрабатывает Markdown
   *  - Иначе → просто копирует файл в .build/content
   *
   * Используется watcher'ом для инкрементальной сборки.
   *
   * @param {string} src - Путь к исходному файлу
   */
  const dst = path.join(
    BUILD_CONTENT,
    path.relative(SRC_CONTENT, src)
  );

  if (src.endsWith(".md")) {
    await processMarkdown(src, dst);
  } else {
    ensureDir(path.dirname(dst));
    fs.copyFileSync(src, dst);
  }
}

function removeFile(src) {
  /**
   * removeFile
   * Удаляет соответствующий файл из .build/content,
   * если исходный файл был удалён.
   *
   * Используется watcher'ом при событии unlink.
   *
   * @param {string} src - Путь к удалённому файлу
   */
  const dst = path.join(
    BUILD_CONTENT,
    path.relative(SRC_CONTENT, src)
  );

  if (fs.existsSync(dst)) {
    fs.unlinkSync(dst);
  }
}

/* ================= Math Rendering ================= */

/* ===================== Safe SVG extraction ===================== */
async function renderMath(latex, srcFile, isInline) { 
  /**
   * renderMath
   * Компилирует LaTeX-формулу в SVG (если нужно)
   * и возвращает Hugo shortcode для вставки.
   *
   * @param {string} latex - LaTeX-код
   * @param {string} srcFile - Файл-источник (для логирования)
   * @param {boolean} isInline - Inline или блоковая формула
   * @returns {Promise<string>} Hugo shortcode
   */

  const hash = await compileMath(latex, isInline, srcFile);

  return `{{< tex hash="${hash}"${isInline ? ' inline="true"' : ''} />}}`;
}

async function compileMath(latex, isInline, srcFile) {
  /**
   * compileMath
   * Добавляет задачу компиляции LaTeX-формулы в очередь.
   *
   * Шаги:
   *  1. Генерирует хэш
   *  2. Проверяет существование SVG (кэш)
   *  3. Запускает pdflatex
   *  4. Конвертирует PDF → SVG
   *  5. Нормализует SVG
   *
   * Компиляция выполняется через общую очередь.
   *
   * @param {string} latex - LaTeX-код
   * @param {boolean} isInline - Inline или блок
   * @param {string} srcFile - Исходный файл
   * @returns {Promise<string>} Хэш SVG
   */
  return new Promise((resolve, reject) => {

    compileQueue.push(async () => {
      try {
        ensureDir(MATH_TMP_DIR);
        ensureDir(MATH_SVG_DIR);

        const body = isInline
          ? `$${latex}$`
          : `\\[\n${latex}\n\\]`;

        const hash = sha1(body);

        const texFile = path.join(MATH_TMP_DIR, `${hash}.tex`);
        const pdfFile = path.join(MATH_TMP_DIR, `${hash}.pdf`);
        const svgFile = path.join(MATH_SVG_DIR, `${hash}.svg`);

        if (fs.existsSync(svgFile)) {
          resolve(hash);
          return;
        }

        const tex = `
\\documentclass[border=2pt, varwidth]{standalone}
\\usepackage{amsmath}
\\usepackage{amssymb}
\\usepackage{amsfonts}
\\usepackage{mathtools}
\\usepackage[T2A]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage[american,russian]{babel}
\\begin{document}
${body}
\\end{document}
`;

        fs.writeFileSync(texFile, tex);

        await execAsync(
          `pdflatex -interaction=batchmode -output-directory="${MATH_TMP_DIR}" "${texFile}"`
        );
        await execAsync(`pdf2svg "${pdfFile}" "${svgFile}"`);
        
        let svg = fs.readFileSync(svgFile, "utf8");
        svg = normalizeMathSVG(svg);
        svg = uniquifySVG(svg, hash);

        if (fs.existsSync(svgFile)) {
          const oldSvg = fs.readFileSync(svgFile, "utf8");
          if (oldSvg === svg) {
            return hash;
            }
        }
        fs.writeFileSync(svgFile, svg);

        console.log("Math LaTeX compile success:", svgFile, body);

        resolve(hash);

      } catch (err) {
        console.error("Math LaTeX compile error:");
        console.error("file:", srcFile);
        console.error("latex:", latex);
        reject(err);
      }
    });

    runCompileQueue();
  });
}


/* ================= TikZ Rendering ================= */
function normalizeTikzSVG(svg) {
  /**
   * normalizeTikzSVG
   * Нормализует SVG, полученный из TikZ:
   *  - удаляет width/height
   *  - заменяет чёрный цвет на currentColor
   *
   * Это позволяет управлять размером и цветом через CSS.
   *
   * @param {string} svg - Исходный SVG
   * @returns {string} Нормализованный SVG
   */
  return svg
    .replace(/\swidth="[^"]+"/, '')
    .replace(/\sheight="[^"]+"/, '')
    .replace(/fill="rgb\(0%,\s*0%,\s*0%\)"/g, 'fill="currentColor"')
    .replace(/stroke="rgb\(0%,\s*0%,\s*0%\)"/g, 'stroke="currentColor"')
    .replace(/<svg([^>]*)>/, '<svg$1 preserveAspectRatio="xMidYMid meet">')  
    ;
}


function compileTikz(code, hash, srcFile) {
  /**
   * compileTikz
   * Добавляет задачу компиляции TikZ в очередь.
   *
   * Шаги:
   *  1. Генерирует .tex
   *  2. Запускает pdflatex
   *  3. Конвертирует PDF → SVG
   *  4. Нормализует SVG
   *
   * Использует общую очередь компиляции,
   * чтобы избежать параллельных вызовов pdflatex.
   *
   * @param {string} code - TikZ-код
   * @param {string} hash - Хэш блока
   * @param {string} srcFile - Файл-источник
   * @returns {Promise<string>} Хэш SVG
   */
  return new Promise((resolve, reject) => {

    compileQueue.push(async () => {
      try {
        ensureDir(TIKZ_TMP_DIR);
        ensureDir(TIKZ_SVG_DIR);

        const texFile = path.join(TIKZ_TMP_DIR, `${hash}.tex`);
        const pdfFile = path.join(TIKZ_TMP_DIR, `${hash}.pdf`);
        const svgFile = path.join(TIKZ_SVG_DIR, `${hash}.svg`);
        
        if (fs.existsSync(svgFile)) {
          resolve(hash);
          return;
        }

        const tex = `
\\documentclass[tikz,border=2pt]{standalone}
\\usepackage{tikz}
\\usepackage[T2A]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage[american,russian]{babel}
\\usetikzlibrary{positioning,shapes,shadows,arrows,arrows.meta}
\\usetikzlibrary{datavisualization, datavisualization.formats.functions}
\\usetikzlibrary{calc} % для позиционирования на картинках
\\usetikzlibrary{tikzmark}
\\usetikzlibrary{bending,fit,automata}
\\usetikzlibrary{decorations.pathreplacing}
\\begin{document}
${code}
\\end{document}
`;

        fs.writeFileSync(texFile, tex);

        await execAsync(
          `pdflatex -interaction=batchmode -output-directory="${TIKZ_TMP_DIR}" "${texFile}"`,
          { stdio: "inherit" }
        );

        await execAsync(`pdf2svg "${pdfFile}" "${svgFile}"`, { stdio: "inherit" });

        let svg = fs.readFileSync(svgFile, 'utf8');
        svg = normalizeTikzSVG(svg);
        svg = uniquifySVG(svg, hash);
        fs.writeFileSync(svgFile, svg);

        console.log("TikZ LaTeX compile success:", svgFile);

        resolve(hash)
      } catch (err) {
        console.error("TikZ LaTeX compile error:");
        console.error("file:", srcFile);
        console.error("code:", code);
        reject(err)
      }
    })

    runCompileQueue()
  })
}

/* ================= Markdown Processor ================= */

async function processMarkdown(srcFile, dstFile) {
  /**
   * processMarkdown
   * Полностью обрабатывает Markdown-файл:
   *
   *  1. Заменяет блоковую математику ($$ $$)
   *  2. Заменяет inline математику (\( \))
   *  3. Компилирует TikZ-блоки
   *  4. Записывает результат в .build/content
   *
   * Использует replaceAsync для безопасной
   * асинхронной замены.
   *
   * @param {string} srcFile - Исходный Markdown
   * @param {string} dstFile - Путь назначения
   */
  let text = fs.readFileSync(srcFile, "utf8");

  // ----- Блоковая математика -----
  text = await replaceAsync(text, BLOCK_MATH, async (match, latex) => {
    return await renderMath(latex.trim(), srcFile, false);
  });

  // ----- Inline математика -----
  text = await replaceAsync(text, INLINE_MATH, async (match, latex) => {
    return await renderMath(latex.trim(), srcFile, true);
  });

  // ----- TikZ -----
  text = await replaceAsync(text, TIKZ_RE, async (match, attrStr = "", code) => {
    code = code.trim();

    const hash = sha1(code);

    // ВАЖНО: await!
    await compileTikz(code, hash, srcFile);

    // --- Парсинг атрибутов ---
    const attrs = {};
    attrStr.split(/\s+/).forEach(tok => {
      const eq = tok.indexOf("=");
      if (eq !== -1) {
        const key = tok.slice(0, eq);
        let val = tok.slice(eq + 1);
        val = val.replace(/^["']|["']$/g, "");
        attrs[key] = val;
      } else if (tok === "inline") {
        attrs.inline = "true";
      }
    });

    // --- Сборка shortcode ---
    let sc = `{{< tikz hash="${hash}"`;
    if (attrs.inline) sc += ` inline="true"`;
    if (attrs.width) sc += ` width="${attrs.width}"`;
    if (attrs.height) sc += ` height="${attrs.height}"`;
    sc += ` />}}`;

    return sc;
  }
  );

  ensureDir(path.dirname(dstFile));
  fs.writeFileSync(dstFile, text, "utf8");
}

/* ================= Walk ================= */

async function walk(dir) {
  /**
   * walk
   * Рекурсивно обходит директорию content/
   * и обрабатывает все файлы.
   *
   * Используется:
   *  - при начальной сборке
   *
   * После старта watch используется
   * инкрементальная обработка.
   *
   * @param {string} dir - Директория для обхода
   */
  for (const name of fs.readdirSync(dir)) {
    const src = path.join(dir, name);
    const dst = path.join(BUILD_CONTENT, path.relative(SRC_CONTENT, src));

    if (fs.statSync(src).isDirectory()) {
      await walk(src);
    } else if (src.endsWith(".md")) {
      await processMarkdown(src, dst);
    } else {
      ensureDir(path.dirname(dst));
      fs.copyFileSync(src, dst);
    }
  }
}

/* ================= Watch ================= */

function watch() {
  /**
   * watch
   * Запускает chokidar для отслеживания изменений в content/.
   *
   * Реакции:
   *  - add → обработать файл
   *  - change → обработать файл
   *  - unlink → удалить из build
   *
   * Реализует инкрементальную сборку,
   * без полного пересканирования.
   */
  const watcher = chokidar.watch(SRC_CONTENT, {
  ignoreInitial: true,
  usePolling: true,
  interval: 200,
  ignored: [
    /(^|[\/\\])\../,
    MATH_SVG_DIR,
    TIKZ_SVG_DIR,
    BUILD_CONTENT
  ]
  });

  watcher.on("all", (event, file) => {
    console.log("WATCH EVENT:", event, file);
  });

  watcher
    .on("add", file => processFile(file).catch(console.error))
    .on("change", file => processFile(file).catch(console.error))
    .on("unlink", file => removeFile(file));

  console.log("Watching content/ ...");
}

/* ================= Run ================= */

async function main() {
  ensureDir(BUILD_CONTENT);
  ensureDir(MATH_SVG_DIR);
  ensureDir(TIKZ_SVG_DIR);

  if (process.argv.includes("--watch")) {
    await walk(SRC_CONTENT);
    watch();
  } else {
    await walk(SRC_CONTENT);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});