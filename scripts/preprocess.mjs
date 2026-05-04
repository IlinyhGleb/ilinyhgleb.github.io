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
const LATEX_SVG_DIR = "static/latex"
const LATEX_TMP_DIR = ".latex-tmp"

/* ================= Regex ================= */

const LATEX_BLOCK_RE = /{{<\s*latex(?:\s+([^>]*))?\s*>}}([\s\S]*?){{<\s*\/latex\s*>}}/g;
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

function normalizeLatexSVG(svg) {
  /**
   * normalizeLatexSVG
   * Нормализует SVG, полученный из LaTeX-объекта:
   *  - заменяет fill на currentColor
   *  - заменяет stroke на currentColor
   *
   * Это позволяет управлять цветом объекта через CSS.
   *
   * @param {string} svg - Исходный SVG
   * @returns {string} Нормализованный SVG
   */
  return svg
    .replace(/fill="rgb\(0%,\s*0%,\s*0%\)"/g, 'fill="currentColor"')
    .replace(/stroke="rgb\(0%,\s*0%,\s*0%\)"/g, 'stroke="currentColor"')
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

async function compileLatex(code, options = {}, srcFile = "") {
  /**
   * compileLatex
   * Универсальная компиляция LaTeX → SVG
   *
   * Поддерживает:
   *  - math (inline / block)
   *  - tikz
   *  - таблицы
   *  - любой LaTeX
   *
   * @param {string} code - LaTeX код
   * @param {object} options
   * @param {"math"|"tikz"|"block"} options.mode
   * @param {boolean} options.inline
   * @param {string[]} options.packages
   * @param {string} srcFile
   */

  const {
    mode = "block",
    inline = false,
    packages = []
  } = options;

  return new Promise((resolve, reject) => {
    compileQueue.push(async () => {
      try {
        ensureDir(LATEX_TMP_DIR);
        ensureDir(LATEX_SVG_DIR);

        // ---- BODY ----
        let body;

        if (mode === "math") {
          body = inline ? `$${code}$` : `\\[\n${code}\n\\]`;
        } else {
          body = code;
        }

        // ---- AUTO PACKAGES ----
        const autoPackages = new Set(packages);
        const autoPackagesWithOptions = new Map(); // package -> options
        const autoTikzLibs = new Set([]);

        const isTikz =
          mode === "tikz" ||
          body.includes("\\begin{tikzpicture}");

        const isMath = mode === "math";
        const isBlock = mode === "block";
          
        if (isTikz) {
          autoPackages.add("tikz");

          [
            "positioning",
            "shapes",
            "shadows",
            "arrows",
            "arrows.meta",
            "calc",
            "fit",
            "automata",
            "bending",
            "decorations.pathreplacing"
          ].forEach(lib => autoTikzLibs.add(lib));
        }

        // ---- IMAGES ----
        if (body.includes("\\includegraphics")) {
          autoPackages.add("graphicx");
        }

        // ---- TABLES ----
        if (body.includes("\\begin{tabular}")) {
          autoPackages.add("array");
          autoPackages.add("booktabs");

          // support for \rowcolors, \cellcolor, \columncolor
          autoPackagesWithOptions.set("xcolor", "table,xcdraw");
        }
        if (body.includes("\\multirow")) {
          autoPackages.add("multirow");
          autoPackages.add("makecell");
        }

        // ---- HASH ----
        const hash = sha1(
          JSON.stringify({
            body,
            mode,
            inline,
            packages: {
            normal: [...autoPackages].sort(),
            withOptions: [...autoPackagesWithOptions.entries()].sort()
          }
          })
        );

        const texFile = path.join(LATEX_TMP_DIR, `${hash}.tex`);
        const pdfFile = path.join(LATEX_TMP_DIR, `${hash}.pdf`);
        const svgFile = path.join(LATEX_SVG_DIR, `${hash}.svg`);

        if (fs.existsSync(svgFile)) {
          resolve(hash);
          return;
        }

        // ---- DOCUMENTCLASS ----
        const documentClass = isTikz
          ? "\\documentclass[tikz,border=2pt]{standalone}"
          : isMath
            ? "\\documentclass[border=2pt,varwidth]{standalone}"
            : "\\documentclass[border=2pt,varwidth=\\maxdimen]{standalone}";
  
        // ---- PACKAGES STRING ----
        const pkgString = [
          ...[...autoPackages].map(
            p => `\\usepackage{${p}}`
          ),

          ...[...autoPackagesWithOptions.entries()].map(
            ([pkg, opts]) => `\\usepackage[${opts}]{${pkg}}`
          )
        ].join("\n");

        // ---- LIBRARIES STRING ----
        const tikzLibString = autoTikzLibs.size
          ? `\\usetikzlibrary{${[...autoTikzLibs].join(",")}}`
          : "";  

        // ---- TEMPLATE ----
        const tex = `
${documentClass}

\\usepackage{amsmath}
\\usepackage{amssymb}
\\usepackage{amsfonts}
\\usepackage{mathtools}

\\usepackage[T2A]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage[american,russian]{babel}

${pkgString}
${tikzLibString}

\\begin{document}
${body}
\\end{document}
`;

        fs.writeFileSync(texFile, tex);
        const srcDir = path.dirname(srcFile);
        // ---- COMPILE ----
        await execAsync(
          `pdflatex -interaction=batchmode -output-directory="${LATEX_TMP_DIR}" "${texFile}"`,
          {
            env: {
              ...process.env,
              TEXINPUTS: `${srcDir}${path.delimiter}${process.env.TEXINPUTS || ""}`
            }
          }
        );

        await execAsync(`pdf2svg "${pdfFile}" "${svgFile}"`);

        // ---- SVG NORMALIZATION ----
        let svg = fs.readFileSync(svgFile, "utf8");

        if (isTikz) {
          svg = normalizeTikzSVG(svg);
        } else if (isMath) {
          svg = normalizeMathSVG(svg);
        } else {
          svg = normalizeLatexSVG(svg);
        }

        svg = uniquifySVG(svg, hash);

        fs.writeFileSync(svgFile, svg);

        console.log("LaTeX compile success:", svgFile);

        resolve(hash);

      } catch (err) {
        console.error("LaTeX compile error:");
        console.error("file:", srcFile);
        console.error("code:", code);
        reject(err);
      }
    });

    runCompileQueue();
  });
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

  // ===== 1. LATEX BLOCK (универсальный) =====
  text = await replaceAsync(text, LATEX_BLOCK_RE, async (match, attrStr = "", code) => {
    code = code.trim();

    // --- парсинг атрибутов ---
    const attrs = {};
    attrStr.split(/\s+/).forEach(tok => {
      if (!tok) return;
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

    // --- packages ---
    const packages = attrs.packages
      ? attrs.packages.split(",").map(s => s.trim()).filter(Boolean)
      : [];

    const inline = attrs.inline === "true";

    const hash = await compileLatex(code, {
      mode: "block",
      inline,
      packages
    }, srcFile);

    // --- shortcode output ---
    let sc = `{{< latex hash="${hash}"`;
    if (inline) sc += ` inline="true"`;
    if (attrs.width) sc += ` width="${attrs.width}"`;
    if (attrs.height) sc += ` height="${attrs.height}"`;
    sc += ` />}}`;

    return sc;
  });

  // ----- Блоковая математика -----
  text = await replaceAsync(text, BLOCK_MATH, async (match, latex) => {
    //return await renderMath(latex.trim(), srcFile, false);
    const hash = await compileLatex(latex.trim(), {
      mode: "math",
      inline: false
    }, srcFile);
    
    return `{{< tex hash="${hash}" />}}`;
  });

  // ----- Inline математика -----
  text = await replaceAsync(text, INLINE_MATH, async (match, latex) => {
    //return await renderMath(latex.trim(), srcFile, true);
    const hash = await compileLatex(latex.trim(), {
      mode: "math",
      inline: true
    }, srcFile);

    return `{{< tex hash="${hash}" inline="true" />}}`;
  });

  // ----- TikZ -----
  text = await replaceAsync(text, TIKZ_RE, async (match, attrStr = "", code) => {
    code = code.trim();

    const hash = await compileLatex(code, {
      mode: "tikz"
    }, srcFile);

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
  interval: 2000,
  ignored: [
    /(^|[\/\\])\../,
    //MATH_SVG_DIR,
    //TIKZ_SVG_DIR,
    LATEX_SVG_DIR,
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
  ensureDir(LATEX_SVG_DIR);

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