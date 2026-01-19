import fs from "fs";
import path from "path";
import crypto from "crypto";
import mjAPI from "mathjax-node";
import chokidar from "chokidar";

/* ================== MathJax ================== */

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

/* ================== Пути ================== */

const SRC_CONTENT = "content";
const BUILD_CONTENT = ".build/content";
const SVG_DIR = "static/math";

/* ================== Regex ================== */

// $$ ... $$
const BLOCK_RE = /\$\$([\s\S]+?)\$\$/g;

// \( ... \)
const INLINE_RE = /\\\((.+?)\\\)/g;

/* ================== Utils ================== */

function sha1(str) {
  return crypto.createHash("sha1").update(str).digest("hex");
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

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function renderSVG(latex, context) {
  return new Promise((resolve, reject) => {
    mjAPI.typeset(
      { math: latex, format: "TeX", svg: true },
      data => {
        if (data.errors) {
          const msg = `
✖ MathJax error
File: ${context.file}
Type: ${context.type}
Formula:
${latex}

Errors:
${data.errors.join("\n")}
`;
          reject(new Error(msg));
        } else {
          resolve(data.svg);
        }
      }
    );
  });
}

/* ================== Core ================== */

async function processMarkdown(srcFile, dstFile) {
  let text = fs.readFileSync(srcFile, "utf8");

  // Генерация SVG и замена формул на shortcodes
  async function replaceFormulas(regex, isInline) {
    const matches = [...text.matchAll(regex)];
    for (const m of matches) {
      const latex = (m[1] || m[2]).trim();
      const hash = sha1(latex);
      const svgPath = path.join(SVG_DIR, `${hash}.svg`);

      try {
        if (!fs.existsSync(svgPath)) {
          const raw = await renderSVG(latex, {
            file: srcFile,
            type: isInline ? "inline" : "block"
          });
          const svg = normalizeSVG(raw);
          fs.writeFileSync(svgPath, svg);
          console.log("✔ svg:", svgPath);
        }
      } catch (err) {
        console.error(err.message);
        console.error("↪ skipping formula\n");
        continue;
      }

      const shortcode = isInline
        ? `{{< tex inline >}}${latex}{{< /tex >}}`
        : `{{< tex >}}${latex}{{< /tex >}}`;

      text = text.replace(m[0], shortcode);
    }
  }

  await replaceFormulas(BLOCK_RE, false);
  await replaceFormulas(INLINE_RE, true);

  // Копирование всего текста в .build/content
  ensureDir(path.dirname(dstFile));
  fs.writeFileSync(dstFile, text, "utf8");
}

/* ================== Walk ================== */

async function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const src = path.join(dir, name);
    const dst = path.join(BUILD_CONTENT, path.relative(SRC_CONTENT, src));

    if (fs.statSync(src).isDirectory()) {
      await walk(src);
    } else if (src.endsWith(".md")) {
      await processMarkdown(src, dst);
    } else {
      // Копируем файлы без изменений
      ensureDir(path.dirname(dst));
      fs.copyFileSync(src, dst);
    }
  }
}

/* ================== Watch ================== */

function watchContent() {
  const watcher = chokidar.watch(SRC_CONTENT, { persistent: true });

  const processFile = async (file) => {
    const dst = path.join(BUILD_CONTENT, path.relative(SRC_CONTENT, file));
    if (file.endsWith(".md")) {
      await processMarkdown(file, dst);
    } else {
      ensureDir(path.dirname(dst));
      fs.copyFileSync(file, dst);
    }
  };

  watcher
    .on("add", processFile)
    .on("change", processFile)
    .on("unlink", (file) => {
      const dst = path.join(BUILD_CONTENT, path.relative(SRC_CONTENT, file));
      if (fs.existsSync(dst)) fs.unlinkSync(dst);
    });

  console.log("Watching content/ for changes...");
}

/* ================== Run ================== */

ensureDir(SVG_DIR);
ensureDir(BUILD_CONTENT);

if (process.argv.includes("--watch")) {
  walk(SRC_CONTENT).then(() => {
    console.log("✔ math preprocessing done (initial pass)");
    watchContent();
  });
} else {
  walk(SRC_CONTENT).then(() => {
    console.log("✔ math preprocessing done");
  });
}

process.on("unhandledRejection", err => {
  console.error("UNHANDLED:", err.message);
});
