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
  rotate,
  lock,
  unlock
} from "../ducks/active-block";

export default store => next => action => {
  const { type } = action;
  const getBlock = () => store.getState().activeBlock;
  const getField = () => store.getState().field;
  let block, locked, field, isMovingDown;
  switch (type) {
    case MOVE_LEFT:
      const isMovingLeft = canMoveLeft(getField(), getBlock());
      if (isMovingLeft) {
        next(action);
        block = getBlock();
        locked = block.locked;
        field = getField();
        isMovingDown = canMoveDown(field, block);
        if (locked && isMovingDown) {
          next(unlock());
        }
        if (!locked && !isMovingDown) next(lock());
      }
      break;
    case MOVE_RIGHT:
      const isMovingRight = canMoveRight(getField(), getBlock());
      if (isMovingRight) {
        next(action);
        block = getBlock();
        locked = block.locked;
        field = getField();
        isMovingDown = canMoveDown(field, block);
        if (locked && isMovingDown) {
          next(unlock());
        }
        if (!locked && !isMovingDown) next(lock());
      }
      break;
    case MOVE_DOWN:
      field = getField();
      block = getBlock();
      locked = block.locked;
      if (locked) return;
      isMovingDown = canMoveDown(field, block);
      if (isMovingDown) {
        if (locked) next(unlock());
        next(action);
      }
      field = getField();
      block = getBlock();
      locked = block.locked;
      isMovingDown = canMoveDown(field, block);
      if (!isMovingDown)
        if (!locked) {
          next(lock());
        }
      break;
    case ROTATE:
      return next(rotate(rotateTetramino(getField(), getBlock())));
    default:
      return next(action);
  }
};
