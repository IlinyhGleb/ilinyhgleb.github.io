export const config = {
  tileSize: 32,
  mapW: 200,
  mapH: 15,

  // массив шаблонов
  objects: [
    { type: "column", x: 0, h: 8 },
    { type: "hole", x: 10, w: 3 },
    { type: "platform", x: 30, w: 5, h: 5 },
    { type: "hole", x: 42, w: 6 },
    { type: "column", x: 55, h: 2 },
    { type: "platform", x: 65, w: 8, h: 3 },
  ],
};
