import { shapes, shapesList, DEFAULT_POSITION } from "../../utils/consts";
import { rotate } from "../../utils";

const ROTATE = "ROTATE";
export const MOVE_RIGHT = "MOVE_RIGHT";
export const MOVE_LEFT = "MOVE_LEFT";
export const MOVE_DOWN = "MOVE_DOWN";
export const SET_NEW_TETRAMINO = "SET_NEW_TETRAMINO";

const defaultState = {
  shape: shapes[shapesList[Math.floor(Math.random() * shapesList.length)]],
  position: DEFAULT_POSITION
};
export default (state = defaultState, action) => {
  const { type, payload } = action;
  const { shape } = state;
  switch (type) {
    case ROTATE:
      return { ...state, shape: rotate(shape) };
    case MOVE_LEFT:
      return { ...state, position: [state.position[0] - 1, state.position[1]] };
    case MOVE_RIGHT:
      return { ...state, position: [state.position[0] + 1, state.position[1]] };
    case MOVE_DOWN:
      return { ...state, position: [state.position[0], state.position[1] + 1] };
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

export const rotateTetramino = () => ({
  type: ROTATE
});
