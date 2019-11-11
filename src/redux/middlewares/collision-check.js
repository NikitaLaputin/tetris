import { canMoveLeft, canMoveRight, rotateTetrimino } from "../../utils";
import {
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  ROTATE,
  rotate
} from "../ducks/active-block";

export default store => next => action => {
  const { type } = action;
  const getBlock = () => store.getState().activeBlock;
  const getField = () => store.getState().field;
  let block, locked;
  switch (type) {
    case MOVE_LEFT:
      const isMovingLeft = canMoveLeft(getField(), getBlock());
      if (isMovingLeft) {
        next(action);
      }
      break;
    case MOVE_RIGHT:
      const isMovingRight = canMoveRight(getField(), getBlock());
      if (isMovingRight) {
        next(action);
      }
      break;
    case MOVE_DOWN:
      block = getBlock();
      locked = block.locked;
      if (locked) return;
      return next(action);
    case ROTATE:
      next(rotate(rotateTetrimino(getField(), getBlock())));
      break;
    default:
      return next(action);
  }
};
