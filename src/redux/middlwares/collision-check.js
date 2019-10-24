import { canMove } from "../../utils";
import { DOWN, DEFAULT_POSITION } from "../../utils/consts";
import { MOVE_DOWN, SET_NEW_TETRAMINO } from "../ducks/active-block";

export default store => next => action => {
  const { type } = action;
  if (type !== MOVE_DOWN) return next(action);
  const { shape, position } = store.getState().activeBlock;
  const canMoveDown = canMove({ shape, position, direction: DOWN });
  if (canMoveDown) return next(action);
  store.dispatch({
    type: SET_NEW_TETRAMINO,
    payload: {
      shape: store.getState().nextBlock,
      position: DEFAULT_POSITION
    }
  });
};
