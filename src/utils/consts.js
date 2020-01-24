export const SHAPES = {
  I: [
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0]
  ],
  J: [
    [0, 2, 0],
    [0, 2, 0],
    [2, 2, 0]
  ],
  L: [
    [0, 3, 0],
    [0, 3, 0],
    [0, 3, 3]
  ],
  O: [
    [4, 4],
    [4, 4]
  ],
  S: [
    [0, 5, 5],
    [5, 5, 0],
    [0, 0, 0]
  ],
  T: [
    [0, 0, 0],
    [6, 6, 6],
    [0, 6, 0]
  ],
  Z: [
    [7, 7, 0],
    [0, 7, 7],
    [0, 0, 0]
  ]
};
export const SHAPES_LIST = "IJLOSTZ";
export const RIGHT = "RIGHT";
export const LEFT = "LEFT";
export const DOWN = "DOWN";
export const DEFAULT_POSITION = [3, 0];
export const colors = [
  "rgba(255, 255, 255, 1)",
  "rgba(0, 243, 255, 1)",
  "rgba(0, 90, 255, 1)",
  "rgba(255, 118, 0, 1)",
  "rgba(255, 247, 0, 1)",
  "rgba(0, 255, 102, 1)",
  "rgba(133, 0, 255, 1)",
  "rgba(255, 0, 0, 1)"
];
export const IN_PROGRESS = "Running";
export const GAME_OVER = "GAME OVER";
export const INVISIBLE_ROWS = 4;
export const SHAPE_POSITION = {
  I: [3, INVISIBLE_ROWS - 4],
  J: [3, INVISIBLE_ROWS - 3],
  L: [3, INVISIBLE_ROWS - 3],
  O: [4, INVISIBLE_ROWS - 2],
  S: [3, INVISIBLE_ROWS - 3],
  T: [3, INVISIBLE_ROWS - 3],
  Z: [3, INVISIBLE_ROWS - 3]
};
export const MAX_LEVELS = 15;
export const GAME_PAUSED = "GAME_PAUSED";
export const NOT_STARTED = "NOT_STARTED";
export const LOCK_DELAY = 500;
export const DEFAULT_SHAPE = {
  shape: SHAPES.I,
  position: SHAPE_POSITION.I
};

export const PIXEL_RATIO = (() => window.devicePixelRatio)();
