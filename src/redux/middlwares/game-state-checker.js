import { GAME_OVER, GAME_PAUSED } from "../../utils/consts";
import { TOGGLE_PAUSE } from "../ducks/game-state";

export default store => next => action => {
  const { status } = store.getState().gameState;
  const { type } = action;
  switch (status) {
    case GAME_OVER:
      break;
    case GAME_PAUSED:
      switch (type) {
        case TOGGLE_PAUSE:
          return next(action);
        default:
          break;
      }
      break;
    default:
      return next(action);
  }
};
