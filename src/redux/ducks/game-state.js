import {
  IN_PROGRESS,
  GAME_OVER,
  GAME_PAUSED,
  NOT_STARTED
} from "../../utils/consts";
import { MERGE } from "./field";
import { calcNewScore, calcLevel, calcSpeed } from "../../utils";

export const START = "START";
export const DEFEAT = "DEFEAT";
export const ROWS_DESTROYED = "ROWS_DESTROYED";
export const PAUSE = "PAUSE";
export const RESUME = "RESUME";
export const RESET = "RESET";
export const TOGGLE_PAUSE = "TOGGLE_PAUSE";

const defaultState = {
  status: NOT_STARTED,
  lastAction: null,
  level: 1,
  score: 0,
  lines: 0,
  speed: 1000
};

export default (state = defaultState, action) => {
  const { type, lines } = action;
  switch (type) {
    case START:
      return { ...defaultState, status: IN_PROGRESS, lastAction: START };
    case MERGE:
      return { ...state, score: state.score + 10, lastAction: MERGE };
    case DEFEAT:
      return { ...state, status: GAME_OVER, lastAction: DEFEAT };
    case ROWS_DESTROYED:
      const newLevel = calcLevel(state.lines + lines);
      const newSpeed = calcSpeed(newLevel);
      return {
        ...state,
        lines: state.lines + lines,
        score: calcNewScore({ ...state, lines }),
        level: newLevel,
        speed: newSpeed,
        lastAction: ROWS_DESTROYED
      };
    case PAUSE:
      return { ...state, status: GAME_PAUSED, lastAction: PAUSE };
    case RESUME:
      return { ...state, status: IN_PROGRESS, lastAction: RESUME };
    case RESET:
      return { ...defaultState, status: IN_PROGRESS, lastAction: RESET };
    default:
      return state;
  }
};

export const start = () => ({
  type: START
});

export const gameOver = () => ({
  type: DEFEAT
});

export const rowsDestroyed = lines => ({
  type: ROWS_DESTROYED,
  lines
});

export const togglePause = () => ({
  type: TOGGLE_PAUSE
});

export const reset = () => ({
  type: RESET
});

export const pause = () => ({
  type: PAUSE
});

export const resume = () => ({
  type: RESUME
});
