import { SET_NEW_TETRAMINO } from "./active-block";
import { RESET } from "./game-state";
import { getNewTetramino } from "../../utils";

export default (state = getNewTetramino(), action) => {
  const { type } = action;
  switch (type) {
    case SET_NEW_TETRAMINO:
      return getNewTetramino();
    case RESET:
      return getNewTetramino();
    default:
      return state;
  }
};
