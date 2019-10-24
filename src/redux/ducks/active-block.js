import {
  shapes,
  shapesList,
  LEFT,
  RIGHT,
  DOWN,
  DEFAULT_POSITION
} from "../../utils/consts";
import { rotate, canMove } from "../../utils";

const ROTATE = "ROTATE";
const MOVE_RIGHT = "MOVE_RIGHT";
const MOVE_LEFT = "MOVE_LEFT";
export const MOVE_DOWN = "MOVE_DOWN";
export const SET_NEW_TETRAMINO = "SET_NEW_TETRAMINO";

const defaultState = {
  shape: shapes[shapesList[Math.floor(Math.random() * shapesList.length)]],
  position: DEFAULT_POSITION
};
export default (state = defaultState, action) => {
  const { type, payload } = action;
  const { shape, position } = state;
  switch (type) {
    case ROTATE:
      return { ...state, shape: rotate(state.shape) };
    case MOVE_LEFT:
      return canMove({ shape, position, direction: LEFT })
        ? { ...state, position: [state.position[0] - 1, state.position[1]] }
        : state;
    case MOVE_RIGHT:
      return canMove({ shape, position, direction: RIGHT })
        ? { ...state, position: [state.position[0] + 1, state.position[1]] }
        : state;
    case MOVE_DOWN:
      return canMove({ shape, position, direction: DOWN })
        ? { ...state, position: [state.position[0], state.position[1] + 1] }
        : state;
    case SET_NEW_TETRAMINO:
      return payload;
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
