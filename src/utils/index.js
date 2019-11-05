import {
  INVISIBLE_ROWS,
  SHAPES_LIST,
  SHAPES,
  SHAPE_POSITION,
  MAX_LEVELS
} from "./consts";

const flipMatrix = matrix =>
  matrix[0].map((_, index) => matrix.map(row => row[index]));

const firstNonzero = arr =>
  !~arr.findIndex(val => val) ? arr.length - 1 : arr.findIndex(val => val);

const lastNonzero = arr => arr.reduce((acc, val, i) => (val ? i : acc), 0);

const getLeftPoint = matrix =>
  Math.min(...matrix.map(row => firstNonzero(row)));

const getRightPoint = matrix =>
  Math.max(...matrix.map(row => lastNonzero(row)));

const getBottomPoint = matrix =>
  Math.max(
    ...matrix.map((row, i) => row.reduce((acc, val) => (val ? i : acc), 0))
  );

export const rotate = matrix => {
  return flipMatrix(matrix.slice().reverse());
};

export const canMoveLeft = (field, block) => {
  const { shape, position } = block;
  const [x, y] = position;
  for (let row = 0; row < shape.length; row++)
    for (let cell = 0; cell < shape[row].length; cell++)
      if (
        shape[row][cell] &&
        (x + getLeftPoint(shape) <= 0 ||
          (field[row + y] && field[row + y][cell + x - 1]))
      )
        return false;
  return true;
};

export const canMoveRight = (field, block) => {
  const { shape, position } = block;
  const [x, y] = position;
  for (let row = 0; row < shape.length; row++)
    for (let cell = 0; cell < shape[row].length; cell++)
      if (
        shape[row][cell] &&
        (x + getRightPoint(shape) >= 9 ||
          (field[row + y] && field[row + y][cell + x + 1]))
      )
        return false;
  return true;
};

export const canMoveDown = (field, block) => {
  const { shape, position } = block;
  const [x, y] = position;
  for (let row = 0; row < shape.length; row++)
    for (let cell = 0; cell < shape[row].length; cell++)
      if (
        shape[row][cell] &&
        (y + getBottomPoint(shape) >= 19 + INVISIBLE_ROWS ||
          (field[row + y + 1] && field[row + y + 1][cell + x]))
      )
        return false;
  return true;
};

const between = (value, start, finish) => value > start && value < finish;

export const mergeMatrix = (target, matrix, position) =>
  target.map((row, ri) =>
    row.map((cell, ci) =>
      between(ri, position[1] - 1, position[1] + matrix.length) &&
      between(
        ci,
        position[0] - 1,
        position[0] + matrix[ri - position[1]].length
      ) &&
      matrix[ri - position[1]][ci - position[0]]
        ? matrix[ri - position[1]][ci - position[0]]
        : cell
    )
  );

export const collide = (field, block) => {
  const { shape, position } = block;
  const [x, y] = position;
  for (let row = 0; row < shape.length; row++)
    for (let cell = 0; cell < shape[row].length; cell++)
      if (
        shape[row][cell] &&
        (x + getLeftPoint(shape) < 0 ||
          x + getRightPoint(shape) > 9 ||
          y + getBottomPoint(shape) >= 20 + INVISIBLE_ROWS ||
          (field[row + y] && field[row + y][cell + x]))
      )
        return true;
  return false;
};

export const rotateTetramino = (field, tetramino) => {
  const { shape, position } = tetramino;
  let rotated = { shape: rotate(shape), position };
  const maxDelta = Math.floor(shape.length / 2);
  if (!collide(field, rotated)) {
    return rotated;
  }
  for (let deg = Math.PI / 2; deg <= Math.PI * 2; deg *= 2) {
    const delta = Math.floor(Math.cos(deg));
    for (let dx = delta; dx !== 0 && Math.abs(dx) <= maxDelta; dx += delta) {
      rotated = {
        ...rotated,
        position: [position[0] + dx, position[1]]
      };
      if (!collide(field, rotated)) {
        return rotated;
      }
    }
  }
  return tetramino;
};

const isFullRow = arr => arr && arr.length === arr.filter(val => val).length;

const isNullRow = arr => !arr.filter(val => val).length;

export const destroyFullRows = matrix => {
  const heightBefore = getFiledHeight(matrix);
  matrix = matrix
    .map((row, i) =>
      isFullRow(row) ? new Array(matrix[i].length).fill(0) : row
    )
    .sort(row => (isNullRow(row) ? -1 : 0));
  const heightAfter = getFiledHeight(matrix);
  const rows = heightBefore - heightAfter;
  return {
    matrix,
    rows
  };
};

export const getFiledHeight = field =>
  field.reduce((acc, row) => (row.filter(val => val).length ? ++acc : acc), 0);

export const calcNewScore = ({ score, level, lines }) => {
  switch (lines) {
    case 1:
      return score + 40 * (level + 1);
    case 2:
      return score + 100 * (level + 1);
    case 3:
      return score + 300 * (level + 1);
    case 4:
      return score + 1200 * (level + 1);
    default:
      return score;
  }
};

export const getNewTetramino = () => {
  const letter = Math.floor(Math.random() * SHAPES_LIST.length);
  const shape = SHAPES[SHAPES_LIST[letter]];
  const position = SHAPE_POSITION[SHAPES_LIST[letter]];
  return { shape, position };
};

export const calcLevel = lines => Math.min(Math.ceil(lines / 10), MAX_LEVELS);

export const calcSpeed = level =>
  Math.round(Math.pow(0.8 - (level - 1) * 0.007, level - 1) * 1000 * 100000) /
  100000;
