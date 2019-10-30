import { MERGE, destroyRow } from "../ducks/field";
import { getFiledHeight } from "../../utils";
import { gameOver } from "../ducks/game-state";

export default store => next => action => {
  const { type } = action;
  switch (type) {
    case MERGE:
      next(action);
      next(destroyRow());
      const fieldHeight = getFiledHeight(store.getState().field);
      if (fieldHeight >= 20) {
        next(gameOver());
      }
      break;
    default:
      return next(action);
  }
};
