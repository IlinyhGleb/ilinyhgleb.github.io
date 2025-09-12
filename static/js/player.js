import { config } from "./config.js";
import { physics } from "./physics.js";
import { map } from "./map.js";

const tileSize = config.tileSize;
const mapW = config.mapW;
const mapH = config.mapH;
const gravity = physics.gravity;
const terminalVy = physics.terminalVy;
const speed = physics.speed;
const jumpVelocity = physics.jumpVelocity;

const playerImg = new Image();
playerImg.src = "/images/player.png";

export let player = {
  w: tileSize * 0.8,
  h: tileSize * 1.5,
  x: 2 * tileSize,
  y: (mapH - 1) * tileSize - tileSize * 1.5,
  vx: 0,
  vy: 0,
  onGround: false,
  dir: 1,
  alive: true,   // новое свойство
};

export function resetPlayer() {
  player.x = 2 * tileSize,
  player.y = (mapH - 1) * tileSize - tileSize * 1.5,
  player.vx = 0;
  player.vy = 0;
  player.onGround = false;
  player.dir = 1;
}

export function updatePlayer(keys) {
  if (!player.alive) return; // если мертв – ничего не делаем

  if (keys["ArrowLeft"]) {
    player.vx = -speed;
    player.dir = -1;
  } else if (keys["ArrowRight"]) {
    player.vx = speed;
    player.dir = 1;
  } else {
    player.vx = 0;
  }

  if (keys["ArrowUp"] && player.onGround) {
    player.vy = jumpVelocity;
    player.onGround = false;
  }

  player.vy += gravity;
  if (player.vy > terminalVy) player.vy = terminalVy;

  player.x += player.vx;
  player.y += player.vy;

  handleCollisions();

  // проверка на смерть (упал ниже карты)
  if (player.y > mapH * tileSize) {
    player.alive = false;
  }
}

export function drawPlayer(ctx, camera) {
  if (!player.alive) return; // не рисуем, если умер

  if (playerImg.complete && playerImg.naturalWidth > 0) {
    // хотим, чтобы персонаж был около 1.5 тайла в высоту
    const targetHeight = tileSize * 1.5;
    const scale = targetHeight / playerImg.naturalHeight;
    const targetWidth = playerImg.naturalWidth * scale;

    ctx.save();

    // переносим в центр по X
    ctx.translate(player.x - camera.x + targetWidth / 2, player.y - camera.y);

    // зеркалим по X если идём влево
    ctx.scale(player.dir, 1);

    // рисуем картинку с новым масштабом
    ctx.drawImage(
      playerImg,
      -targetWidth / 2, // чтобы центр совпадал
      0,    //  targetHeight чтобы "ноги" стояли на земле
      targetWidth,
      targetHeight
    );

    ctx.restore();
  } else {
    // запасной вариант — зелёный прямоугольник
    ctx.fillStyle = "lime";
    ctx.fillRect(
      player.x - camera.x,
      player.y - camera.y,
      player.w,
      player.h
    );
  }
}



function handleCollisions() {
  player.onGround = false;

  const leftTile = Math.floor(player.x / tileSize);
  const rightTile = Math.floor((player.x + player.w) / tileSize);
  const topTile = Math.floor(player.y / tileSize);
  const bottomTile = Math.floor((player.y + player.h) / tileSize);

  for (let y = topTile; y <= bottomTile; y++) {
    for (let x = leftTile; x <= rightTile; x++) {
      if (map[y] && map[y][x] === 1) {
        const tileX = x * tileSize;
        const tileY = y * tileSize;

        // Проверка пересечения игрока и тайла
        if (
          player.x < tileX + tileSize &&
          player.x + player.w > tileX &&
          player.y < tileY + tileSize &&
          player.y + player.h > tileY
        ) {
          const overlapX = Math.min(
            player.x + player.w - tileX,
            tileX + tileSize - player.x
          );
          const overlapY = Math.min(
            player.y + player.h - tileY,
            tileY + tileSize - player.y
          );

          // решаем, по какой оси раздвигать
          if (overlapX < overlapY) {
            // Горизонтальная коллизия
            if (player.x + player.w / 2 < tileX + tileSize / 2) {
              // игрок слева от тайла → двигаем влево
              player.x -= overlapX;
            } else {
              // игрок справа от тайла → двигаем вправо
              player.x += overlapX;
            }
            player.vx = 0;
          } else {
            // Вертикальная коллизия
            if (player.y + player.h / 2 < tileY + tileSize / 2) {
              // игрок сверху → ставим на тайл
              player.y -= overlapY;
              player.vy = 0;
              player.onGround = true;
            } else {
              // игрок снизу → ударился головой
              player.y += overlapY;
              player.vy = 0;
            }
          }
        }
      }
    }
  }
}
