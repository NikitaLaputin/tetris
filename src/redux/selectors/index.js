import { getGhostBlock, mergeMatrix } from "../../utils";
import { createSelector } from "reselect";
import { INVISIBLE_ROWS } from "../../utils/consts";

export const blockSelector = createSelector(
  state => state.activeBlock,
  block => ({
    ...block,
    position: [block.position[0], block.position[1] - INVISIBLE_ROWS]
  })
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
export const nextBlockSelector = state => state.nextBlock;
export const ghostBlockSelector = state =>
  getGhostBlock(fieldSelector(state), blockSelector(state));

export const activeFieldSelector = createSelector(
  blockSelector,
  ghostBlockSelector,
  fieldSelector,
  (block, ghostBlock, field) => {
    const fieldWithBlock = mergeMatrix(field, block.shape, block.position);
    const activeField = mergeMatrix(
      fieldWithBlock,
      ghostBlock.shape,
      ghostBlock.position
    );

    return activeField;
  }
);
