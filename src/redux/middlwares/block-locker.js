import {
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_DOWN,
  ROTATE,
  unlock,
  lock
} from "../ducks/active-block";
import { canMoveDown } from "../../utils";

const actions = [MOVE_LEFT, MOVE_RIGHT, MOVE_DOWN, ROTATE];

export default store => next => action => {
  const { type } = action;
  if (actions.includes(type)) {
    next(action);
    const block = store.getState().activeBlock;
    const locked = block.locked;
    const field = store.getState().field;
    const isMovingDown = canMoveDown(field, block);
    if (locked && isMovingDown) {
      next(unlock());
    }
    if (!locked && !isMovingDown) next(lock());
  } else {
    return next(action);
  }
};
