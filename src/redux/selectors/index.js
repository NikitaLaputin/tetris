import { getGhostBlock, mergeMatrix } from '../../utils';
import { createSelector } from 'reselect';
import { INVISIBLE_ROWS } from '../../utils/consts';

export const blockSelector = createSelector(
  state => state.activeBlock,
  block => {
    const { shape, locked } = block;
    const coloredShape = shape.map(row =>
      row.map(cell => (cell ? cell + 8 * !!locked : 0))
    );

    return {
      shape: coloredShape,
      locked,
      position: [block.position[0], block.position[1] - INVISIBLE_ROWS]
    };
  }
);

export const fieldSelector = createSelector(
  state => state.field,
  field => field.slice(INVISIBLE_ROWS)
);

export const levelSelector = state => state.gameState.level;

export const scoreSelector = state => state.gameState.score;

export const highScoreSelector = state => state.highScore;

export const linesSelector = state => state.gameState.lines;

export const gameStateSelector = state => state.gameState;

export const gameStatusSelector = state => gameStateSelector(state).status;

export const gameLastActionSelector = state =>
  gameStateSelector(state).lastAction;

export const speedSelector = state => gameStateSelector(state).speed;

export const nextBlockSelector = createSelector(
  state => state.nextBlock,
  (_, width, height, side) => ({ width, height, side }),
  (nextBlock, { width, height, side }) => {
    const { shape } = nextBlock;
    const x =
      Math.floor(((width - shape[0].length * side) / (2 * side)) * 10) / 10;

    const y =
      Math.floor(((height - shape.length * side) / (2 * side)) * 10) / 10;

    const position = [x, y];

    return { shape, position };
  }
);

export const ghostBlockSelector = createSelector(
  fieldSelector,
  blockSelector,
  (field, block) => {
    const { shape, position } = getGhostBlock(field, block);
    const ghostBlockShape = shape.map(row => row.map(cell => (cell ? 'g' : 0)));

    return { shape: ghostBlockShape, position };
  }
);

export const activeFieldSelector = createSelector(
  blockSelector,
  ghostBlockSelector,
  fieldSelector,
  (block, ghostBlock, field) => {
    const fieldWithGhostBlock = mergeMatrix(
      field,
      ghostBlock.shape,
      ghostBlock.position
    );
    const activeField = mergeMatrix(
      fieldWithGhostBlock,
      block.shape,
      block.position
    );

    return activeField;
  }
);
