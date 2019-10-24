import { shapes, shapesList } from "../../utils/consts";
import { rotate } from "../../utils";

const ROTATE = "ROTATE";
const defaultState = {
  shape: shapes[shapesList[Math.floor(Math.random() * shapesList.length)]],
  position: [0, 0]
};
export default (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ROTATE:
      return { ...state, shape: rotate(state.shape) };
    default:
      return state;
  }
};
