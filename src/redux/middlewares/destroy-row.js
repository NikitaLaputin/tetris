import { MERGE, destroyRow, mergeField } from "../ducks/field";
import { destroyFullRows, collide, canMoveDown, Timeout } from "../../utils";
import {
  rowsDestroyed,
  gameOver,
  PAUSE,
  RESUME,
  TOGGLE_PAUSE
} from "../ducks/game-state";
import {
  SET_NEW_TETRIMINO,
  setNewTetrimino,
  unlock,
  LOCK,
  UNLOCK
} from "../ducks/active-block";
import { LOCK_DELAY, GAME_PAUSED, IN_PROGRESS } from "../../utils/consts";
import { saveHighScore } from "../../localstorage";
import { scoreSelector, highScoreSelector } from "../selectors";
import { setNewHighScore } from "../ducks/high-score";

export default store => next => action => {
  const { type } = action;
  const nextBlock = store.getState().nextBlock;
  const dispatchMerge = () => {
    store.dispatch(mergeField(store.getState().activeBlock));
  };
  switch (type) {
    case LOCK:
      Timeout.set(dispatchMerge, LOCK_DELAY);
      return next(action);
    case UNLOCK:
      Timeout.clear(dispatchMerge);
      return next(action);
    case TOGGLE_PAUSE:
      const isPaused = store.getState().gameState.status === GAME_PAUSED;
      if (isPaused) {
        Timeout.resume(dispatchMerge);
      } else {
        const isRunning = store.getState().gameState.status === IN_PROGRESS;
        if (isRunning) Timeout.pause(dispatchMerge);
      }
      return next(action);
    case PAUSE:
      Timeout.pause(dispatchMerge);
      return next(action);
    case RESUME:
      Timeout.resume(dispatchMerge);
      return next(action);
    case MERGE:
      const { payload } = action;
      const field = store.getState().field;
      const isMovingDown = canMoveDown(field, payload);
      if (isMovingDown) {
        return next(unlock());
      }
      next(action);
      const mergedField = store.getState().field;
      const { matrix, rows } = destroyFullRows(mergedField);
      next(destroyRow(matrix));
      if (rows > 0) {
        store.dispatch(rowsDestroyed(rows));
      }
      return store.dispatch(setNewTetrimino(nextBlock));
    case SET_NEW_TETRIMINO:
      const state = store.getState();
      if (collide(state.field, state.nextBlock)) {
        const score = scoreSelector(state);
        const highScore = highScoreSelector(state);
        if (highScore.reduce((res, val) => (res ? res : val < score), false)) {
          next(setNewHighScore(score));
          saveHighScore(highScoreSelector(store.getState()));
        }
        next(unlock());
        return store.dispatch(gameOver());
      }
      next(action);
      break;
    default:
      return next(action);
  }
};
