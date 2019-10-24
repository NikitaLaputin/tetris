import { LEFT, RIGHT } from "./consts";

const flipMatrix = matrix =>
  matrix[0].map((_, index) => matrix.map(row => row[index]));

const firstNonzero = arr =>
  !~arr.findIndex(val => val) ? arr.length - 1 : arr.findIndex(val => val);

const lastNonzero = arr => arr.reduce((acc, val, i) => (val ? i : acc), 0);

const getLeftPoint = matrix =>
  Math.min(...matrix.map(row => firstNonzero(row)));

const getRightPoint = matrix =>
  Math.max(...matrix.map(row => lastNonzero(row)));

export const rotate = matrix => {
  flipMatrix(matrix.reverse());
};

export const canMove = ({ shape, position, direction }) => {
  const [x] = position;
  switch (direction) {
    case LEFT:
      const leftPoint = getLeftPoint(shape);
      return x + leftPoint > 0;
    case RIGHT:
      const rightPoint = getRightPoint(shape);
      return x + rightPoint < 9;
    default:
      return false;
  }
};
