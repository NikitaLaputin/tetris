import { canMoveLeft, canMoveDown, canMoveRight } from "../../utils";
import { DEFAULT_POSITION } from "../../utils/consts";
import {
  MOVE_DOWN,
  SET_NEW_TETRAMINO,
  MOVE_LEFT,
  MOVE_RIGHT
} from "../ducks/active-block";
import { MERGE } from "../ducks/field";

export default store => next => action => {
  const { type } = action;
  const block = store.getState().activeBlock;
  const field = store.getState().field;
  switch (type) {
    case MOVE_LEFT:
      const isMovingLeft = canMoveLeft(field, block);
      console.log("CAN MOVE LEFT", isMovingLeft);
      if (isMovingLeft) return next(action);
      break;
    case MOVE_RIGHT:
      const isMovingRight = canMoveRight(field, block);
      console.log("CAN MOVE RIGHTMOVE_RIGHT", isMovingRight);
      if (isMovingRight) return next(action);
      break;
    case MOVE_DOWN:
      const isMovingDown = canMoveDown(field, block);
      console.log("CAN MOVE DOWN", isMovingDown);
      if (isMovingDown) return next(action);
      else {
        store.dispatch({
          type: MERGE,
          payload: store.getState().activeBlock
        });
        store.dispatch({
          type: SET_NEW_TETRAMINO,
          payload: {
            shape: store.getState().nextBlock,
            position: DEFAULT_POSITION
          }
        });
      }
      break;
    default:
      return next(action);
  }
};
