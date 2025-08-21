const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// ===== Карта =====
const tileSize = 40;
const mapW = 20;
const mapH = 12;

// 0 - пусто, 1 - блок земли
const map = Array.from({ length: mapH }, (_, y) =>
  Array.from({ length: mapW }, (_, x) => {
    if (y === mapH - 1) return 1; // пол
    if (y > mapH - 4 && (x % 5 === 0)) return 1; // колонны
    return 0;
  })
);

// ===== Игрок =====
let player = {
  x: 2 * tileSize,
  y: (mapH - 1) * tileSize - tileSize * 0.8,
  w: tileSize * 0.8,
  h: tileSize * 0.8,
  vx: 0,
  vy: 0,
  onGround: false,
};

let camera = {
  x: 0,
  y: 0,
  w: canvas.width,
  h: canvas.height,
};


const keys = {};
document.addEventListener("keydown", (e) => (keys[e.key] = true));
document.addEventListener("keyup", (e) => (keys[e.key] = false));

// ===== Игровая логика =====
function update() {
  // управление
  if (keys["ArrowLeft"]) player.vx = -3;
  else if (keys["ArrowRight"]) player.vx = 3;
  else player.vx = 0;

  if (keys["ArrowUp"] && player.onGround) {
    player.vy = -10; // прыжок
    player.onGround = false;
  }

  // гравитация
  player.vy += 0.5;
  if (player.vy > 10) player.vy = 10;

  // движение
  player.x += player.vx;
  player.y += player.vy;

  // столкновения с картой
  handleCollisions();
}

function handleCollisions() {
  player.onGround = false;

  // определяем тайлы, с которыми игрок пересекается
  const leftTile = Math.floor(player.x / tileSize);
  const rightTile = Math.floor((player.x + player.w) / tileSize);
  const topTile = Math.floor(player.y / tileSize);
  const bottomTile = Math.floor((player.y + player.h) / tileSize);

  for (let y = topTile; y <= bottomTile; y++) {
    for (let x = leftTile; x <= rightTile; x++) {
      if (map[y] && map[y][x] === 1) {
        const tileX = x * tileSize;
        const tileY = y * tileSize;

        // AABB коллизия
        if (
          player.x < tileX + tileSize &&
          player.x + player.w > tileX &&
          player.y < tileY + tileSize &&
          player.y + player.h > tileY
        ) {
          // вычисляем перекрытие
          const overlapX = Math.min(
            player.x + player.w - tileX,
            tileX + tileSize - player.x
          );
          const overlapY = Math.min(
            player.y + player.h - tileY,
            tileY + tileSize - player.y
          );

          if (overlapX < overlapY) {
            // горизонтальное столкновение
            if (player.x < tileX) player.x -= overlapX;
            else player.x += overlapX;
            player.vx = 0;
          } else {
            // вертикальное столкновение
            if (player.y < tileY) {
              player.y -= overlapY;
              player.vy = 0;
              player.onGround = true;
            } else {
              player.y += overlapY;
              player.vy = 0;
            }
          }
        }
      }
    }
  }
}

// ===== Рендер =====
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // карта
  for (let y = 0; y < mapH; y++) {
    for (let x = 0; x < mapW; x++) {
      if (map[y][x] === 1) {
        ctx.fillStyle = "#654321"; // земля
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
    }
  }

  // игрок
  ctx.fillStyle = "red";
  ctx.fillRect(
    player.x - camera.x,
    player.y - camera.y,
    player.w,
    player.h
  );
}


function updateCamera() {
  camera.x = player.x + player.w / 2 - camera.w / 2;
  camera.y = player.y + player.h / 2 - camera.h / 2;

  // ограничение по карте
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
  update();
  updateCamera();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
