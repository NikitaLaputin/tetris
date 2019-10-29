import {
  canMoveLeft,
  canMoveDown,
  canMoveRight,
  rotateTetramino
} from "../../utils";
import {
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  ROTATE,
  setNewTetramino,
  rotate
} from "../ducks/active-block";
import { mergeField } from "../ducks/field";

export default store => next => action => {
  const { type } = action;
  const block = store.getState().activeBlock;
  const field = store.getState().field;
  const nextBlock = store.getState().nextBlock;
  switch (type) {
    case MOVE_LEFT:
      const isMovingLeft = canMoveLeft(field, block);
      if (isMovingLeft) return next(action);
      break;
    case MOVE_RIGHT:
      const isMovingRight = canMoveRight(field, block);
      if (isMovingRight) return next(action);
      break;
    case MOVE_DOWN:
      const isMovingDown = canMoveDown(field, block);
      if (isMovingDown) return next(action);
      else {
        next(mergeField(block));
        next(setNewTetramino(nextBlock));
      }
      break;
    case ROTATE:
      return next(rotate(rotateTetramino(field, block)));
    default:
      return next(action);
  }
};
