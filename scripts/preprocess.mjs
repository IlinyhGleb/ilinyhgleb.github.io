// preprocess.mjs
import fs from "fs";
import path from "path";
import crypto from "crypto";
import chokidar from "chokidar";
import mjAPI from "mathjax-node";
import { execSync } from "child_process";

/* ================= CONFIG ================= */

const SRC_CONTENT = "content";
const BUILD_CONTENT = ".build/content";
const MATH_SVG_DIR = "static/math";
const TIKZ_SVG_DIR = "static/tikz";
const TIKZ_TMP_DIR = ".tikz-tmp";

/* ================= MathJax ================= */

const OPERATORS = ["sh", "ch", "th", "tg", "ctg"];
const MACROS = Object.fromEntries(
  OPERATORS.map(op => [op, [`\\operatorname{${op}}`, 0]])
);

mjAPI.config({
  MathJax: {
    SVG: { font: "TeX" },
    TeX: { Macros: MACROS }
  }
});
mjAPI.start();

/* ================= Regex ================= */

const BLOCK_MATH = /\$\$([\s\S]+?)\$\$/g;
const INLINE_MATH = /\\\((.+?)\\\)/g;

const TIKZ_RE = /{{<\s*tikz(?:\s+([^>]*))?\s*>}}([\s\S]*?){{<\s*\/tikz\s*>}}/g;

/* ================= Utils ================= */

function sha1(str) {
  return crypto.createHash("sha1").update(str).digest("hex");
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function normalizeSVG(svg) {
  return svg
    .replace(/fill="[^"]*"/g, 'fill="currentColor"')
    .replace(/stroke="[^"]*"/g, 'stroke="currentColor"')
    .replace(
      /<text /g,
      '<text font-family="serif, PT Serif, Times New Roman" font-size="0.8em" font-style="italic"'
    );
}

/* ================= Math Rendering ================= */

async function renderMath(latex, srcFile, isInline) {
  const hash = sha1(latex);
  const svgPath = path.join(MATH_SVG_DIR, `${hash}.svg`);

  if (!fs.existsSync(svgPath)) {
    const data = await new Promise((resolve, reject) => {
      mjAPI.typeset({ math: latex, format: "TeX", svg: true }, resolve);
    });

    if (data.errors) {
      console.error("MathJax error:", srcFile, latex, data.errors);
      return null;
    }

    const svg = normalizeSVG(data.svg);
    fs.writeFileSync(svgPath, svg);
    console.log("✔ math:", svgPath);
  }

  // Возвращаем Goldmark-шорткод, чтобы Goldmark рендерил inline/block
  return isInline
    ? `{{< tex inline >}}${latex}{{< /tex >}}`
    : `{{< tex >}}${latex}{{< /tex >}}`;
}

/* ================= TikZ Rendering ================= */
function normalizeTikzSVG(svg) {
  // Убираем width/height, чтобы можно было управлять через CSS
  return svg
    .replace(/\swidth="[^"]+"/, '')
    .replace(/\sheight="[^"]+"/, '')
    .replace(/fill="rgb\(0%,\s*0%,\s*0%\)"/g, 'fill="currentColor"')
    .replace(/stroke="rgb\(0%,\s*0%,\s*0%\)"/g, 'stroke="currentColor"');
}


function compileTikz(code, hash, srcFile) {
  const texFile = path.join(TIKZ_TMP_DIR, `${hash}.tex`);
  const pdfFile = path.join(TIKZ_TMP_DIR, `${hash}.pdf`);
  const svgFile = path.join(TIKZ_SVG_DIR, `${hash}.svg`);

  if (fs.existsSync(svgFile)) return;

  ensureDir(TIKZ_TMP_DIR);
  ensureDir(TIKZ_SVG_DIR);

  const tex = `
\\documentclass[tikz,border=2pt]{standalone}
\\usepackage{tikz}
\\begin{document}
${code}
\\end{document}
`;

  fs.writeFileSync(texFile, tex);

  try {
    execSync(`pdflatex -interaction=batchmode -output-directory=${TIKZ_TMP_DIR} ${texFile}`);
    execSync(`pdf2svg ${pdfFile} ${svgFile}`);

    // --- Нормализуем SVG после генерации ---
    const raw = fs.readFileSync(svgFile, 'utf8');
    const cleaned = normalizeTikzSVG(raw);
    fs.writeFileSync(svgFile, cleaned);

    console.log("✔ tikz:", svgFile);
  } catch {
    console.error("TikZ compile error:", srcFile);
  }
}

/* ================= Markdown Processor ================= */

async function processMarkdown(srcFile, dstFile) {
  let text = fs.readFileSync(srcFile, "utf8");

  // ----- Блоковая математика -----
  for (const m of [...text.matchAll(BLOCK_MATH)]) {
    const latex = m[1].trim();
    const shortcode = await renderMath(latex, srcFile, false);
    if (shortcode) text = text.replace(m[0], shortcode);
  }

  // ----- Inline математика -----
  for (const m of [...text.matchAll(INLINE_MATH)]) {
    const latex = m[1].trim();
    const shortcode = await renderMath(latex, srcFile, true);
    if (shortcode) text = text.replace(m[0], shortcode);
  }

  // ----- TikZ -----
  for (const m of [...text.matchAll(TIKZ_RE)]) {
    const attrStr = m[1] || ""; // например: width="70%" height="300px" inline
    const code = m[2].trim();
    const hash = sha1(code);

    compileTikz(code, hash, srcFile);

    // Парсим атрибуты
    const attrs = {};
    attrStr.split(/\s+/).forEach(tok => {
      const eq = tok.indexOf("=");
      if (eq !== -1) {
        const key = tok.slice(0, eq);
        let val = tok.slice(eq + 1);
        // убираем кавычки, если есть
        val = val.replace(/^["']|["']$/g, "");
        attrs[key] = val;
      } else if (tok === "inline") {
        attrs["inline"] = "true";
      }
    });

    // Собираем shortocode
    let sc = `{{< tikz hash="${hash}"`;
    if (attrs.inline) sc += ` inline="true"`;
    if (attrs.width) sc += ` width="${attrs.width}"`;
    if (attrs.height) sc += ` height="${attrs.height}"`;
    sc += ` />}}`;

    text = text.replace(m[0], sc);
  }

  ensureDir(path.dirname(dstFile));
  fs.writeFileSync(dstFile, text, "utf8");
}

/* ================= Walk ================= */

async function walk(dir) {
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
  const watcher = chokidar.watch(SRC_CONTENT, { ignoreInitial: true });
  let timer = null;

  function scheduleRebuild(event, file) {
    console.log(`📄 ${event}: ${path.relative(SRC_CONTENT, file)}`);
    clearTimeout(timer);
    timer = setTimeout(async () => {
      console.log("🔄 running preprocess...");
      await walk(SRC_CONTENT);
      console.log("✔ preprocess done\n");
    }, 150);
  }

  watcher
    .on("add", file => scheduleRebuild("add", file))
    .on("change", file => scheduleRebuild("change", file))
    .on("unlink", file => scheduleRebuild("unlink", file));

  console.log("👀 Watching content/ ...");
}

/* ================= Run ================= */

ensureDir(BUILD_CONTENT);
ensureDir(MATH_SVG_DIR);
ensureDir(TIKZ_SVG_DIR);

if (process.argv.includes("--watch")) {
  walk(SRC_CONTENT).then(watch);
} else {
  walk(SRC_CONTENT);
}

process.on("unhandledRejection", err => console.error("UNHANDLED:", err.message));