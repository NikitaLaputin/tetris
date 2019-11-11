import { getNewTetramino } from "../../utils";
import { RESET } from "./game-state";

export const ROTATE = "active-block/ROTATE";
export const MOVE_RIGHT = "active-block/MOVE_RIGHT";
export const MOVE_LEFT = "active-block/MOVE_LEFT";
export const MOVE_DOWN = "active-block/MOVE_DOWN";
export const SET_NEW_TETRAMINO = "active-block/SET_NEW_TETRAMINO";
export const LOCK = "active-block/LOCK";
export const UNLOCK = "active-block/UNLOCK";

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
    case LOCK:
      return { ...state, locked: true };
    case UNLOCK:
      return { ...state, locked: false };
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

export const lock = () => ({
  type: LOCK
});

export const unlock = () => ({
  type: UNLOCK
});
