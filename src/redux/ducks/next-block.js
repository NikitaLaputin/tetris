import { shapes, shapesList } from "../../utils/consts";
import { SET_NEW_TETRAMINO } from "./active-block";

const defaultState =
  shapes[shapesList[Math.floor(Math.random() * shapesList.length)]];

export default (state = defaultState, action) => {
  const { type } = action;
  switch (type) {
    case SET_NEW_TETRAMINO:
      return shapes[shapesList[Math.floor(Math.random() * shapesList.length)]];
    default:
      return state;
  }
};
