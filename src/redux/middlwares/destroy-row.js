import { MERGE, destroyRow } from "../ducks/field";
import { destroyFullRows, collide } from "../../utils";
import { rowsDestroyed, gameOver } from "../ducks/game-state";
import { SET_NEW_TETRAMINO } from "../ducks/active-block";

export default store => next => action => {
  const { type } = action;
  switch (type) {
    case MERGE:
      next(action);
      const field = store.getState().field;
      const { matrix, rows } = destroyFullRows(field);
      next(destroyRow(matrix));
      if (rows > 0) {
        next(rowsDestroyed(rows));
      }
      break;
    case SET_NEW_TETRAMINO:
      if (collide(store.getState().field, store.getState().nextBlock))
        return next(gameOver());
      next(action);
      break;
    default:
      return next(action);
  }
};
