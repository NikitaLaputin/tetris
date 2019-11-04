import { getNewTetramino } from "../../utils";
import { RESET } from "./game-state";

export const ROTATE = "ROTATE";
export const MOVE_RIGHT = "MOVE_RIGHT";
export const MOVE_LEFT = "MOVE_LEFT";
export const MOVE_DOWN = "MOVE_DOWN";
export const SET_NEW_TETRAMINO = "SET_NEW_TETRAMINO";

export default (state = getNewTetramino(), action) => {
  const { type, payload } = action;
  switch (type) {
    case ROTATE:
      return payload ? payload : state;
    case MOVE_LEFT:
      return { ...state, position: [state.position[0] - 1, state.position[1]] };
    case MOVE_RIGHT:
      return { ...state, position: [state.position[0] + 1, state.position[1]] };
    case MOVE_DOWN:
      return { ...state, position: [state.position[0], state.position[1] + 1] };
    case SET_NEW_TETRAMINO:
      return payload;
    case RESET:
      return getNewTetramino();
    default:
      return state;
  }
};

export const moveRight = () => ({
  type: MOVE_RIGHT
});

export const moveLeft = () => ({
  type: MOVE_LEFT
});

export const moveDown = () => ({
  type: MOVE_DOWN
});

export const rotate = payload => ({
  type: ROTATE,
  payload
});

export const setNewTetramino = payload => ({
  type: SET_NEW_TETRAMINO,
  payload
});
