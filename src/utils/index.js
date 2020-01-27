import {
  INVISIBLE_ROWS,
  SHAPES_LIST,
  SHAPES,
  SHAPE_POSITION,
  MAX_LEVELS,
  colors,
  BLOCK_SIDE
} from './consts';

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

export const rotateTetrimino = (field, tetrimino) => {
  const { shape, position, locked } = tetrimino;
  let rotated = { shape: rotate(shape), position, locked };
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
  return tetrimino;
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

const randomizeShapes = () =>
  [...SHAPES_LIST].sort(() => Math.round(Math.random() * 2 - 1));

export const getNewTetrimino = (() => {
  let i = 0;
  let randomArray = randomizeShapes();
  const getNextShape = () => {
    const letter = randomArray[i];
    i++;
    if (i > 6) {
      i = 0;
      randomArray = randomizeShapes();
    }
    const shape = SHAPES[letter];
    const position = SHAPE_POSITION[letter];
    return { shape, position, locked: false };
  };
  return getNextShape;
})();

export const calcLevel = lines => Math.min(Math.ceil(lines / 10), MAX_LEVELS);

export const calcSpeed = level =>
  Math.round(Math.pow(0.8 - (level - 1) * 0.007, level - 1) * 1000 * 100000) /
  100000;

export const Timeout = (() => {
  const keys = {};
  const keyData = {};
  const set = (key, wait) => {
    clear(key);
    keys[key] = setTimeout(key, wait);
    keyData[key] = { start: new Date().getTime(), paused: false, wait };
  };

  const clear = key => {
    if (keys[key]) {
      clearTimeout(keys[key]);
      delete keys[key];
      delete keyData[key];
    }
  };

  const paused = key => keys[key] && keyData[key] && keyData[key].paused;

  const pause = key => {
    if (!keys[key]) return;
    if (paused(key)) return;
    clearTimeout(keys[key]);
    const start = new Date().getTime();
    const wait = keyData[key].wait - (start - keyData[key].start);

    keyData[key] = { start, wait, paused: true };
  };

  const resume = key => {
    if (!keys[key]) return;
    if (!paused(key)) return;

    set(key, keyData[key].wait);
  };

  return {
    set,
    clear,
    pause,
    resume
  };
})();

export const Interval = (() => {
  const keys = {};
  const keyData = {};
  const keysTimeouts = {};
  const set = (key, ms) => {
    clear(key);
    keys[key] = setInterval(() => {
      key();
      keyData[key] = {
        start: new Date().getTime(),
        paused: false,
        ms,
        wait: 0
      };
    }, ms);
    keyData[key] = { start: new Date().getTime(), paused: false, ms, wait: 0 };
  };

  const clear = key => {
    if (keys[key]) {
      clearInterval(keys[key]);
      clearTimeout(keysTimeouts[key]);
      delete keys[key];
      delete keyData[key];
    }
  };

  const paused = key => keys[key] && keyData[key] && keyData[key].paused;

  const pause = key => {
    if (!keys[key]) return;
    if (paused(key)) return;
    clearInterval(keys[key]);
    clearTimeout(keysTimeouts[key]);
    const start = new Date().getTime();
    const wait = keyData[key].ms - (start - keyData[key].start);

    keyData[key] = { ...keyData[key], start, wait, paused: true };
  };

  const resume = key => {
    if (!keys[key]) return;
    if (!paused(key)) return;
    keysTimeouts[key] = setTimeout(() => {
      key();
      set(key, keyData[key].ms);
    }, keyData[key].wait);
  };

  return {
    set,
    clear,
    pause,
    resume
  };
})();

export const getShapeColor = shape =>
  colors[
    shape.reduce(
      (acc, row) =>
        acc ? acc : row.reduce((acc, cell) => (cell ? cell : acc), 0),
      0
    )
  ];

export const darkenColor = (color, percent) =>
  color
    .split('(')
    .map((val, i) =>
      i
        ? val
            .split(', ')
            .map((val, i, arr) =>
              i < arr.length - 1
                ? Math.max(
                    Math.min(255, Math.floor((val * (100 - percent)) / 100)),
                    0
                  )
                : val
            )
            .join(', ')
        : val
    )
    .join('(');

export const lightenColor = (color, percent) =>
  color
    .split('(')
    .map((val, i) =>
      i
        ? val
            .split(', ')
            .map((val, i, arr) =>
              i < arr.length - 1
                ? Math.max(
                    Math.min(
                      255,
                      Math.floor(((255 - val) * percent) / 100 + +val)
                    ),
                    0
                  )
                : val
            )
            .join(', ')
        : val
    )
    .join('(');

export const getGhostBlock = (field, block) => {
  while (canMoveDown(field, block)) {
    const { position } = block;
    block = {
      ...block,
      position: [position[0], position[1] + 1]
    };
  }
  return block;
};

export const isMobileDevice = (() =>
  typeof window.orientation !== 'undefined' ||
  navigator.userAgent.indexOf('IEMobile') !== -1)();

export const timeFromMs = ms =>
  `${Math.floor(ms / 60)}:${('0' + Math.floor(ms % 60)).slice(-2)}`;

export const clearArea = (ctx, area, position) => {
  area.forEach((row, rowI) =>
    row.forEach((cell, cellI) => {
      if (cell) {
        ctx.clearRect(
          (cellI + position[0]) * BLOCK_SIDE,
          (rowI + position[1]) * BLOCK_SIDE,
          BLOCK_SIDE,
          BLOCK_SIDE
        );
      }
    })
  );
};

export const getDifference = (newArea, newAreaPos, oldArea, oldAreaPos) => {
  if (!(oldArea && oldAreaPos))
    return {
      renderArea: newArea,
      clearArea: newArea.map(row => new Array(row.length).fill(0))
    };

  const [offsetX, offsetY] = [
    newAreaPos[0] - oldAreaPos[0],
    newAreaPos[1] - oldAreaPos[1]
  ];

  const renderArea = newArea.map((row, ri) =>
    row.map((cell, ci) => {
      if (!cell) return cell;

      if (
        ri + offsetY < 0 ||
        ri + offsetY >= oldArea.length ||
        ci + offsetX < 0 ||
        ci + offsetX >= oldArea[ri].length
      ) {
        return cell;
      }

      return cell === oldArea[ri + offsetY][ci + offsetX] ? 0 : cell;
    })
  );

  const clearArea = newArea.map((row, ri) =>
    row.map((cell, ci) => {
      if (
        ri + offsetY < 0 ||
        ri + offsetY >= oldArea.length ||
        ci + offsetX < 0 ||
        ci + offsetX >= oldArea[ri].length
      ) {
        return cell;
      }

      return cell === oldArea[ri + offsetY][ci + offsetX] &&
        oldArea[ri + offsetY][ci + offsetX]
        ? 0
        : cell;
    })
  );

  return {
    renderArea,
    clearArea
  };
};
