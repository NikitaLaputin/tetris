import {
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_DOWN,
  ROTATE,
  unlock,
  lock
} from "../ducks/active-block";
import { canMoveDown } from "../../utils";
import { fieldSelector, blockSelector } from "../selectors";

const actions = [MOVE_LEFT, MOVE_RIGHT, MOVE_DOWN, ROTATE];

export default store => next => action => {
  const { type } = action;

  if (!actions.includes(type)) return next(action);

  next(action);

  const block = blockSelector(store.getState());
  const { locked } = block;
  const field = fieldSelector(store.getState());
  const isMovingDown = canMoveDown(field, block);

  if (locked && isMovingDown) {
    next(unlock());
  }

  if (!locked && !isMovingDown) {
    next(lock());
  }
};
