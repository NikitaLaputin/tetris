import { SET_NEW_Tetrimino } from "./active-block";
import { RESET } from "./game-state";
import { getNewTetrimino } from "../../utils";
import { DEFAULT_SHAPE } from "../../utils/consts";

export default (state = DEFAULT_SHAPE, action) => {
  const { type } = action;
  switch (type) {
    case SET_NEW_Tetrimino:
      return getNewTetrimino();
    case RESET:
      return getNewTetrimino();
    default:
      return state;
  }
};
