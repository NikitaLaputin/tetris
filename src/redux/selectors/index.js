export const blockSelector = state => state.activeBlock;
export const fieldSelector = state => state.field;
export const levelSelector = state => state.gameState.level;
export const scoreSelector = state => state.gameState.score;
export const linesSelector = state => state.gameState.lines;
export const gameStatusSelector = state => state.gameState.status;
export const speedSelector = state => state.gameState.speed;
export const timerSelector = state => state.timer;
