import { MERGE, destroyRow } from "../ducks/field";
import { getFiledHeight } from "../../utils";
import { gameOver, rowsDestroyed } from "../ducks/game-state";

export default store => next => action => {
  const { type } = action;
  switch (type) {
    case MERGE:
      const heightBefore = getFiledHeight(store.getState().field);
      next(action);
      next(destroyRow());
      const heightAfter = getFiledHeight(store.getState().field);
      console.log("ROWS DESTROYED", heightBefore - heightAfter);
      if (heightAfter >= 20) {
        next(gameOver());
      } else if (heightBefore - heightAfter) {
        next(rowsDestroyed(heightBefore - heightAfter));
      }
      break;
    default:
      return next(action);
  }
};
