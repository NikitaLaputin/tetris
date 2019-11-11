import { SET_NEW_Tetrimino } from "./active-block";
import { RESET } from "./game-state";
import { getNewTetrimino } from "../../utils";

export default (state = getNewTetrimino(), action) => {
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
