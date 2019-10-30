import { IN_PROGRESS, GAME_OVER } from "../../utils/consts";
import { MERGE } from "./field";
import { calcNewScore } from "../../utils";

export const LOST = "LOST";
export const ROWS_DESTROYED = "ROWS_DESTROYED";

const defaultState = {
  status: IN_PROGRESS,
  level: 0,
  score: 0
};

export default (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case MERGE:
      return { ...state, score: state.score + 10 };
    case LOST:
      return { ...state, status: GAME_OVER };
    case ROWS_DESTROYED:
      return { ...state, score: calcNewScore({ ...state, lines: payload }) };
    default:
      return state;
  }
};

export const gameOver = () => ({
  type: LOST
});

export const rowsDestroyed = payload => ({
  type: ROWS_DESTROYED,
  payload
});
