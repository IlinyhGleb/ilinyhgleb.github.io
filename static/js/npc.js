import { config } from "./config.js";
import { player } from "./player.js";

export function updateNPC() {
  const dx = Math.abs(player.x - npc.x);
  const dy = Math.abs(player.y - npc.y);
  npc.showText = dx < 60 && dy < 60;
}

const tileSize = config.tileSize;
const mapW = config.mapW;
const mapH = config.mapH;

const npcImg = new Image();
npcImg.src = "/images/npc.png";

export let npc = {
  x: 12 * tileSize,
  y: (mapH - 2) * tileSize,
  w: tileSize * 0.8,
  h: tileSize * 0.8,
  text: "Привет, путник!",
  showText: false,
};


export function drawNPC(ctx, camera) {
  if (npcImg.complete && npcImg.naturalWidth > 0) {
    ctx.drawImage(
      npcImg,
      npc.x - camera.x,
      npc.y - camera.y,
      npc.w,
      npc.h
    );
  } else {
    ctx.fillStyle = "blue";
    ctx.fillRect(npc.x - camera.x, npc.y - camera.y, npc.w, npc.h);
  }

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
