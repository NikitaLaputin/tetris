import { IN_PROGRESS, GAME_OVER } from "../../utils/consts";
import { MERGE } from "./field";

export const LOST = "LOST";

const defaultState = {
  status: IN_PROGRESS,
  level: 0,
  score: 0
};

export default (state = defaultState, action) => {
  const { type } = action;
  switch (type) {
    case MERGE:
      return { ...state, score: state.score + 10 };
    case LOST:
      return { ...state, status: GAME_OVER };
    default:
      return state;
  }
};

export const gameOver = () => ({
  type: LOST
});
