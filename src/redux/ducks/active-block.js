import { shapes, shapesList, DEFAULT_POSITION } from "../../utils/consts";

export const ROTATE = "ROTATE";
export const MOVE_RIGHT = "MOVE_RIGHT";
export const MOVE_LEFT = "MOVE_LEFT";
export const MOVE_DOWN = "MOVE_DOWN";
export const SET_NEW_TETRAMINO = "SET_NEW_TETRAMINO";

const defaultState = {
  shape: shapes[shapesList[Math.floor(Math.random() * shapesList.length)]],
  position: DEFAULT_POSITION
};
export default (state = defaultState, action) => {
  const { type, payload, shape } = action;
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
      return { shape, position: DEFAULT_POSITION };
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

export const setNewTetramino = shape => ({
  type: SET_NEW_TETRAMINO,
  shape
});
