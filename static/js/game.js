import { config } from "./config.js";
import { physics } from "./physics.js";
import { updatePlayer, player, drawPlayer } from "./player.js";
import { updateNPC, npc, drawNPC } from "./npc.js";
import { map, drawTile } from "./map.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tileSize = config.tileSize;
const mapW = config.mapW;
const mapH = config.mapH;
const gravity = physics.gravity;
const terminalVy = physics.terminalVy;
const speed = physics.speed;

function resizeCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let camera = { x: 0, y: 0, w: canvas.width, h: canvas.height };

const keys = {};
document.addEventListener("keydown", (e) => (keys[e.key] = true));
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

function gameLoop() {
  updatePlayer(keys);
  updateNPC();
  updateCamera();

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < mapH; y++) {
    for (let x = 0; x < mapW; x++) {
      drawTile(ctx, x, y, map[y][x], camera);
    }
  }

  drawPlayer(ctx, camera);
  drawNPC(ctx, camera);

  requestAnimationFrame(gameLoop);
}

gameLoop();
