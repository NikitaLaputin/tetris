export const SHAPES = {
  I: [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]],
  J: [[0, 2, 0], [0, 2, 0], [2, 2, 0]],
  L: [[0, 3, 0], [0, 3, 0], [0, 3, 3]],
  O: [[4, 4], [4, 4]],
  S: [[0, 5, 5], [5, 5, 0], [0, 0, 0]],
  T: [[0, 0, 0], [6, 6, 6], [0, 6, 0]],
  Z: [[7, 7, 0], [0, 7, 7], [0, 0, 0]]
};
export const SHAPES_LIST = "IJLOSTZ";
export const RIGHT = "RIGHT";
export const LEFT = "LEFT";
export const DOWN = "DOWN";
export const DEFAULT_POSITION = [3, 0];
export const colors = [
  "#fff",
  "#00f3ff",
  "#005aff",
  "#ff7600",
  "#fff700",
  "#00ff66",
  "#8500ff",
  "#ff0000"
];
export const IN_PROGRESS = "Running";
export const GAME_OVER = "GAME OVER";
export const INVISIBLE_ROWS = 4;
export const SHAPE_POSITION = {
  I: [4, INVISIBLE_ROWS - 1],
  J: [3, INVISIBLE_ROWS],
  L: [3, INVISIBLE_ROWS],
  O: [4, INVISIBLE_ROWS],
  S: [3, INVISIBLE_ROWS],
  T: [3, INVISIBLE_ROWS],
  Z: [3, INVISIBLE_ROWS]
};
