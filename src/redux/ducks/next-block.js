import { SHAPES, SHAPES_LIST, SHAPE_POSITION } from "../../utils/consts";
import { SET_NEW_TETRAMINO } from "./active-block";

const firstShape = Math.floor(Math.random() * SHAPES_LIST.length);
const defaultState = {
  shape: SHAPES[SHAPES_LIST[firstShape]],
  position: SHAPE_POSITION[SHAPES_LIST[firstShape]]
};

const getNewTetramino = () => {
  const letter = Math.floor(Math.random() * SHAPES_LIST.length);
  const shape = SHAPES[SHAPES_LIST[letter]];
  const position = SHAPE_POSITION[SHAPES_LIST[letter]];
  return { shape, position };
};

export default (state = defaultState, action) => {
  const { type } = action;
  switch (type) {
    case SET_NEW_TETRAMINO:
      return getNewTetramino();
    default:
      return state;
  }
};
