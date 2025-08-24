// map.js
import { config } from "./config.js";

const tileSize = config.tileSize;
const mapW = config.mapW;
const mapH = config.mapH;
const objects = config.objects;

// создаём пустую карту (0 — пусто, 1 — блок/земля)
export let map = Array.from({ length: mapH }, () =>
  Array.from({ length: mapW }, () => 0)
);

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====

// поставить/убрать блок
export function setTile(x, y, type) {
  if (x >= 0 && x < mapW && y >= 0 && y < mapH) {
    map[y][x] = type;
  }
}

// земля внизу
function fillGround() {
  for (let x = 0; x < mapW; x++) {
    setTile(x, mapH - 1, 1);
  }
}

// пропуск (дыра в земле)
function hole(startX, width) {
  for (let x = startX; x < startX + width && x < mapW; x++) {
    setTile(x, mapH - 1, 0);
  }
}

// колонна вверх от земли
function column(x, height) {
  for (let y = 0; y < height; y++) {
    const tileY = mapH - 1 - y;
    if (tileY >= 0) setTile(x, tileY, 1);
  }
}

// платформа на высоте
function platform(startX, width, heightAboveGround) {
  const y = mapH - 1 - heightAboveGround;
  if (y < 0) return;
  for (let x = startX; x < startX + width && x < mapW; x++) {
    setTile(x, y, 1);
  }
}

// ===== ГЕНЕРАЦИЯ КАРТЫ =====
export function generateMap() {
  // очистка карты
  map = Array.from({ length: mapH }, () =>
    Array.from({ length: mapW }, () => 0)
  );

  // земля внизу
  fillGround();



  // пробегаем по массиву и строим объекты
  for (let obj of objects) {
    switch (obj.type) {
      case "hole":
        hole(obj.x, obj.w);
        break;
      case "column":
        column(obj.x, obj.h);
        break;
      case "platform":
        platform(obj.x, obj.w, obj.h);
        break;
    }
  }
}

// сразу генерим карту при загрузке
generateMap();

// ===== РИСОВАНИЕ =====
export function drawTile(ctx, x, y, type, camera) {
  if (type === 1) ctx.fillStyle = "#654321";
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
