import { config } from "./config.js";
import { player } from "./player.js";
import { setTile } from "./map.js";

const tileSize = config.tileSize;
const mapH = config.mapH;

const npcImg = new Image();
npcImg.src = "/images/npc.png";

const gridSize = 5;

// --- список NPC ---
export let npcs = [
  {
    id: "guide",
    w: tileSize * 0.8,
    h: tileSize * 1.5,
    x: 20 * tileSize,
    y: (mapH - 1) * tileSize - tileSize * 1.5,
    type: "text",
    text: "Привет! Добро пожаловать в игру.",
    showText: false,
    dialogActive: false
  },
  {
    id: "builder",
    w: tileSize * 0.8,
    h: tileSize * 1.5,
    x: 40 * tileSize,
    y: (mapH - 1) * tileSize - tileSize * 1.5,
    type: "builder",
    text: "Построй себе мост",
    showText: false,
    dialogActive: false,
    // у строителя хранится шаблон (каждый NPC-builder может иметь свой)
    bridgePattern: Array.from({ length: gridSize }, () => Array(gridSize).fill(0)),
    cursor: { x: 0, y: 0 },
    bridgeX: 42,       // куда будут ставиться блоки (в тайлах)
    bridgeY: mapH - 6
  }
];

// --- обновление NPC (проверяем расстояние до игрока) ---
export function updateNPCs() {
  for (let npc of npcs) {
    const dx = Math.abs(player.x - npc.x);
    const dy = Math.abs(player.y - npc.y);
    npc.showText = dx < 60 && dy < 60 && !npc.dialogActive;
  }
}

// --- обработка диалога ---
export function handleNPCDialog(keys, justPressed) {
  let active = npcs.find(n => n.dialogActive);
  if (!active) return;

  if (active.type === "builder") {
    // управление курсором
    if (justPressed["ArrowUp"]) active.cursor.y = (active.cursor.y - 1 + gridSize) % gridSize;
    if (justPressed["ArrowDown"]) active.cursor.y = (active.cursor.y + 1) % gridSize;
    if (justPressed["ArrowLeft"]) active.cursor.x = (active.cursor.x - 1 + gridSize) % gridSize;
    if (justPressed["ArrowRight"]) active.cursor.x = (active.cursor.x + 1) % gridSize;

    // ставим / убираем блок
    if (justPressed[" "]) {
      active.bridgePattern[active.cursor.y][active.cursor.x] ^= 1;
    }

    // подтверждение
    if (justPressed["Enter"]) {
      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          setTile(
            active.bridgeX + x,
            active.bridgeY + y,
            active.bridgePattern[y][x] ? 1 : 0
          );
        }
      }
      active.dialogActive = false;
    }
  } else if (active.type === "text") {
    if (justPressed["Enter"]) {
      active.dialogActive = false;
    }
  }
}

// --- отрисовка ---
export function drawNPCs(ctx, camera) {
  for (let npc of npcs) {
    // NPC
    if (npcImg.complete && npcImg.naturalWidth > 0) {
      ctx.drawImage(npcImg, npc.x - camera.x, npc.y - camera.y, npc.w, npc.h);
    } else {
      ctx.fillStyle = "blue";
      ctx.fillRect(npc.x - camera.x, npc.y - camera.y, npc.w, npc.h);
    }

    // подсказка "нажми Enter"
    if (npc.showText) {
      ctx.fillStyle = "white";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.fillText(
        npc.text,
        npc.x - camera.x + npc.w / 2,
        npc.y - camera.y - 10
      );
    }
  }
}
