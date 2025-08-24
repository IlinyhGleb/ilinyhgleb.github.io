import { config } from "./config.js";
import { physics } from "./physics.js";
import { updatePlayer, player, drawPlayer } from "./player.js";
import { updateNPCs, drawNPCs, npcs, handleNPCDialog } from "./npc.js";
import { map, setTile, drawTile } from "./map.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tileSize = config.tileSize;
const mapW = config.mapW;
const mapH = config.mapH;

// 5x5 редактор моста (локальный редактор для активного builder-NPC)
let bridgeGrid = Array.from({ length: 5 }, () => Array(5).fill(0));
let cursor = { x: 0, y: 0 };

function resizeCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let camera = { x: 0, y: 0, w: canvas.width, h: canvas.height };

const keys = {};
const justPressed = {};
document.addEventListener("keydown", (e) => {
  // *** если открыт диалог, не даём странице скроллиться и т.п.
  const anyActive = npcs.some(n => n.dialogActive);
  if (anyActive && (e.key === "ArrowUp" || e.key === "ArrowDown" ||
                    e.key === "ArrowLeft" || e.key === "ArrowRight" ||
                    e.key === " " || e.key === "Enter" || e.key === "Escape")) {
    e.preventDefault();
  }

  if (!keys[e.key]) justPressed[e.key] = true;
  keys[e.key] = true;

  // *** открытие builder-диалога по Enter (если рядом)
  if (!anyActive && e.key === "Enter") {
    const nearby = npcs.find(n => n.showText);
    if (nearby) {
      nearby.dialogActive = true;
      // сброс локального редактора под нового NPC
      bridgeGrid = Array.from({ length: 5 }, () => Array(5).fill(0));
      cursor = { x: 0, y: 0 };
      // *** сбрасываем Enter, чтобы не закрылось сразу
      delete justPressed["Enter"];
    }
  }
});
document.addEventListener("keyup", (e) => (keys[e.key] = false));

function updateCamera() {
  camera.w = canvas.width;
  camera.h = canvas.height;
  camera.x = player.x + player.w / 2 - camera.w / 2;
  camera.y = player.y + player.h / 2 - camera.h / 2;
  if (camera.x < 0) camera.x = 0;
  if (camera.y < 0) camera.y = 0;
  if (camera.x + camera.w > mapW * tileSize) {
    camera.x = mapW * tileSize - camera.w;
  }
  if (camera.y + camera.h > mapH * tileSize) {
    camera.y = mapH * tileSize - camera.h;
  }
}

function drawDialog(npc) {
  ctx.fillStyle = "rgba(0,0,0,0.7)";
  ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100);

  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.fillText(npc.text, canvas.width / 2, 80);

  if (npc.type === "builder") {
    const cellSize = 30;
    const startX = canvas.width / 2 - (5 * cellSize) / 2;
    const startY = 120;

    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        ctx.strokeStyle = "white";
        ctx.strokeRect(startX + x * cellSize, startY + y * cellSize, cellSize, cellSize);
        if (bridgeGrid[y][x] === 1) {
          ctx.fillStyle = "#654321";
          ctx.fillRect(startX + x * cellSize, startY + y * cellSize, cellSize, cellSize);
        }
      }
    }

    // курсор
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 2;
    ctx.strokeRect(
      startX + cursor.x * cellSize,
      startY + cursor.y * cellSize,
      cellSize,
      cellSize
    );
    ctx.lineWidth = 1;

    // подсказка
    ctx.fillStyle = "lightgray";
    ctx.fillText(
      "Стрелки — перемещение, Пробел — ставить/убирать, Enter — закрыть",
      canvas.width / 2,
      startY + 5 * cellSize + 40
    );
  } else {
    ctx.fillStyle = "lightgray";
    ctx.fillText("Нажмите Enter, чтобы закрыть", canvas.width / 2, 120);
  }
}

// *** применяем изменение клетки сразу в мир (live-режим)
function applyCellToWorld(npc, gx, gy, value) {
  // «за NPC»: по X — от колонки, где стоит NPC; по Y — выше на 5 клеток от его ног
  const baseTx = Math.floor(npc.x / tileSize);
  const baseTy = Math.floor(npc.y / tileSize) - 5; // сетка начинается над головой NPC
  const tx = baseTx + gx;
  const ty = baseTy + gy;
  setTile(tx, ty, value ? 1 : 0);
}

function handleBuilderDialog(npc) {
  if (justPressed["Escape"] || justPressed["Enter"]) {
    npc.dialogActive = false;
    return;
  }
  if (justPressed["ArrowUp"])    cursor.y = (cursor.y - 1 + 5) % 5;
  if (justPressed["ArrowDown"])  cursor.y = (cursor.y + 1) % 5;
  if (justPressed["ArrowLeft"])  cursor.x = (cursor.x - 1 + 5) % 5;
  if (justPressed["ArrowRight"]) cursor.x = (cursor.x + 1) % 5;

  if (justPressed[" "]) {
    // переключаем клетку и МГНОВЕННО отражаем в мире
    bridgeGrid[cursor.y][cursor.x] ^= 1;
    applyCellToWorld(npc, cursor.x, cursor.y, bridgeGrid[cursor.y][cursor.x]);
  }
}

function gameLoop() {
  const active = npcs.find(n => n.dialogActive);

  if (active) {
    // блокируем передвижение игрока, но обновляем NPC (для показа подсказок остальным)
    if (active.type === "builder") {
      handleBuilderDialog(active);       // обработка ввода + live-строительство
    } else {
      handleNPCDialog(keys, justPressed); // базовые диалоги (если есть у тебя в npc.js)
    }
    updateNPCs();
  } else {
    // обычный игровой цикл
    updatePlayer(keys);
    updateNPCs();
  }

  updateCamera();

  // рендер
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < mapH; y++) {
    for (let x = 0; x < mapW; x++) {
      drawTile(ctx, x, y, map[y][x], camera);
    }
  }

  drawPlayer(ctx, camera);
  drawNPCs(ctx, camera);

  // *** диалог рисуем ПОСЛЕ мира, чтобы он был поверх
  if (active) {
    drawDialog(active);
  }

  // сброс justPressed
  for (let k in justPressed) delete justPressed[k];

  requestAnimationFrame(gameLoop);
}

gameLoop();
