const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const mjAPI = require("mathjax-node");

mjAPI.config({ MathJax: { SVG: { font: "TeX" } } });
mjAPI.start();

const CONTENT_DIR = "content";
const OUT_DIR = "static/math";

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// ищем {{< tex >}}...{{< /tex >}}
const TEX_RE = /{{<\s*tex(?:\s+inline)?\s*>}}([\s\S]*?){{<\s*\/tex\s*>}}/g;

function hash(str) {
  return crypto.createHash("sha1").update(str).digest("hex");
}

function render(latex) {
  return new Promise((resolve, reject) => {
    mjAPI.typeset({ math: latex, format: "TeX", svg: true }, data => {
      if (data.errors) reject(data.errors);
      else resolve(data.svg);
    });
  });
}

function normalizeSVG(svg) {
  return svg
    // убираем фиксированный цвет
    .replace(/fill="[^"]*"/g, 'fill="currentColor"')
    .replace(/stroke="[^"]*"/g, 'stroke="currentColor"');
}

async function processFile(file) {
  const text = fs.readFileSync(file, "utf8");
  const matches = [...text.matchAll(TEX_RE)];

  for (const m of matches) {
    const latex = m[1].trim();
    const h = hash(latex);
    const out = path.join(OUT_DIR, `${h}.svg`);

    if (fs.existsSync(out)) continue;

    const rawSVG = await render(latex);
    const svg = normalizeSVG(rawSVG);
    fs.writeFileSync(out, svg);
    console.log("✔", out);
  }
}

function walk(dir) {
  for (const file of fs.readdirSync(dir)) {
    const p = path.join(dir, file);
    fs.statSync(p).isDirectory() ? walk(p) : processFile(p);
  }
}

walk(CONTENT_DIR);
