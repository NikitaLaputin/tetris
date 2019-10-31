import { MERGE, destroyRow } from "../ducks/field";
import { getFiledHeight, destroyFullRows } from "../../utils";
import { gameOver, rowsDestroyed } from "../ducks/game-state";

export default store => next => action => {
  const { type } = action;
  switch (type) {
    case MERGE:
      next(action);
      const field = store.getState().field;
      const { matrix, rows } = destroyFullRows(field);
      next(destroyRow(matrix));
      const heightAfter = getFiledHeight(store.getState().field);
      if (heightAfter >= 20) {
        next(gameOver());
      } else if (rows > 0) {
        next(rowsDestroyed(rows));
      }
      break;
    default:
      return next(action);
  }
};
