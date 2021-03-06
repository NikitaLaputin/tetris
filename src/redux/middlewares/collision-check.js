import {
  canMoveLeft,
  canMoveRight,
  rotateTetrimino,
  getGhostBlock
} from "../../utils";
import {
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  ROTATE,
  rotate,
  DROP
} from "../ducks/active-block";
import { mergeField } from "../ducks/field";
import { fieldSelector, blockSelector } from "../selectors";

export default store => next => action => {
  const { type } = action;

  switch (type) {
    case MOVE_LEFT: {
      const state = store.getState();
      const field = fieldSelector(state);
      const block = blockSelector(state);
      const isMovingLeft = canMoveLeft(field, block);

      if (isMovingLeft) {
        next(action);
      }

      break;
    }

    case MOVE_RIGHT: {
      const state = store.getState();
      const field = fieldSelector(state);
      const block = blockSelector(state);
      const isMovingRight = canMoveRight(field, block);

      if (isMovingRight) {
        next(action);
      }

      break;
    }

    case MOVE_DOWN: {
      const state = store.getState();
      const block = blockSelector(state);
      const { locked } = block;

      if (locked) return;

      return next(action);
    }

    case DROP: {
      const state = store.getState();
      const { field, activeBlock } = state;
      const { position } = getGhostBlock(field, activeBlock);
      const block = { shape: activeBlock.shape, position };

      return next(mergeField(block));
    }

    case ROTATE: {
      const state = store.getState();
      const { field, activeBlock } = state;

      next(rotate(rotateTetrimino(field, activeBlock)));

      break;
    }

    default:
      return next(action);
  }
};
