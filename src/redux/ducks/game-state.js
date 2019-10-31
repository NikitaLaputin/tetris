import { IN_PROGRESS, GAME_OVER, MAX_LEVELS } from "../../utils/consts";
import { MERGE } from "./field";
import { calcNewScore } from "../../utils";

export const LOST = "LOST";
export const ROWS_DESTROYED = "ROWS_DESTROYED";

const defaultState = {
  status: IN_PROGRESS,
  level: 1,
  score: 0,
  lines: 0,
  speed: 1000
};

export default (state = defaultState, action) => {
  const { type, lines } = action;
  switch (type) {
    case MERGE:
      return { ...state, score: state.score + 10 };
    case LOST:
      return { ...state, status: GAME_OVER };
    case ROWS_DESTROYED:
      const newLevel = Math.min(
        Math.ceil((state.lines + lines) / 10),
        MAX_LEVELS
      );
      const newSpeed =
        Math.round(
          Math.pow(0.8 - (newLevel - 1) * 0.007, newLevel - 1) * 1000 * 100000
        ) / 100000;
      return {
        ...state,
        lines: state.lines + lines,
        score: calcNewScore({ ...state, lines }),
        level: newLevel,
        speed: newSpeed
      };
    default:
      return state;
  }
};

export const gameOver = () => ({
  type: LOST
});

export const rowsDestroyed = lines => ({
  type: ROWS_DESTROYED,
  lines
});
