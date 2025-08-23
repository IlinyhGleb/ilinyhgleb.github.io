import { config } from "./config.js";

const tileSize = config.tileSize;
const mapW = config.mapW;
const mapH = config.mapH;

export const map = Array.from({ length: mapH }, (_, y) =>
  Array.from({ length: mapW }, (_, x) => {
    if (y === mapH - 1) return 1; // земля
    if (x % 30 === 0 && y > mapH - 5) return 1; // колонны
    if ((x % 40) < 6 && y === mapH - 2 - Math.floor(x / 40)) return 1; // ступеньки
    if (y === mapH - 6 && x % 20 < 5) return 2; // платформы
    return 0;
  })
);

export function drawTile(ctx, x, y, type, camera) {
  if (type === 1) ctx.fillStyle = "#654321";
  else if (type === 2) ctx.fillStyle = "#8B4513";
  else return;

  ctx.fillRect(
    x * tileSize - camera.x,
    y * tileSize - camera.y,
    tileSize,
    tileSize
  );
  ctx.strokeStyle = "#222";
  ctx.strokeRect(
    x * tileSize - camera.x,
    y * tileSize - camera.y,
    tileSize,
    tileSize
  );
}
