import { getGhostBlock } from "../../utils";

export const blockSelector = state => state.activeBlock;
export const fieldSelector = state => state.field;
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
