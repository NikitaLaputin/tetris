import { GAME_OVER, GAME_PAUSED } from "../../utils/consts";

export default store => next => action => {
  const { status } = store.getState().gameState;
  switch (status) {
    case GAME_OVER:
      break;
    case GAME_PAUSED:
      break;
    default:
      return next(action);
  }
};
