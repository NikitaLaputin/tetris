import { getNewTetrimino } from "../../utils";
import { RESET } from "./game-state";
import { DEFAULT_SHAPE } from "../../utils/consts";

export const ROTATE = "active-block/ROTATE";
export const MOVE_RIGHT = "active-block/MOVE_RIGHT";
export const MOVE_LEFT = "active-block/MOVE_LEFT";
export const MOVE_DOWN = "active-block/MOVE_DOWN";
export const SET_NEW_Tetrimino = "active-block/SET_NEW_Tetrimino";
export const LOCK = "active-block/LOCK";
export const UNLOCK = "active-block/UNLOCK";
export const DROP = "active-block/DROP";
export const MOVE_LOCK = "active-block/MOVE_LOCK";
export const MOVE_UNLOCK = "active-block/MOVE_UNLOCK";

export default (state = DEFAULT_SHAPE, action) => {
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
    case SET_NEW_Tetrimino:
      return payload;
    case RESET:
      return getNewTetrimino();
    case LOCK:
      return { ...state, locked: true };
    case UNLOCK:
      return { ...state, locked: false };
    case MOVE_LOCK:
      return { ...state, movementLocked: true };
    case MOVE_UNLOCK:
      return { ...state, movementLocked: false };
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

export const setNewTetrimino = payload => ({
  type: SET_NEW_Tetrimino,
  payload
});

export const lock = () => ({
  type: LOCK
});

export const unlock = () => ({
  type: UNLOCK
});

export const drop = () => ({
  type: DROP
});

export const movementLock = () => ({
  type: MOVE_LOCK
});

export const movementUnlock = () => ({
  type: MOVE_UNLOCK
});
