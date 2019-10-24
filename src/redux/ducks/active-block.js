import { shapes, shapesList, LEFT, RIGHT } from "../../utils/consts";
import { rotate, canMove } from "../../utils";

const ROTATE = "ROTATE";
const MOVE_RIGHT = "MOVE_RIGHT";
const MOVE_LEFT = "MOVE_LEFT";
const defaultState = {
  shape: shapes[shapesList[Math.floor(Math.random() * shapesList.length)]],
  position: [0, 0]
};
export default (state = defaultState, action) => {
  const { type } = action;
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
