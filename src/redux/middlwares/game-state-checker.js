import { GAME_OVER, GAME_PAUSED } from "../../utils/consts";
import { TOGGLE_PAUSE, RESET } from "../ducks/game-state";

export default store => next => action => {
  const { status } = store.getState().gameState;
  const { type } = action;
  if (
    (status === GAME_OVER && type !== RESET) ||
    (status === GAME_PAUSED && type !== TOGGLE_PAUSE)
  )
    return;
  return next(action);
};
