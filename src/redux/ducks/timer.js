import { START, TOGGLE_PAUSE, RESET, DEFEAT } from "./game-state";

const defaultState = {
  start: 0,
  stop: 0,
  current: 0,
  running: false
};

export default function timer(state = defaultState, action) {
  const { type } = action;
  const [start, stop] = new Array(2).fill(performance.now());
  switch (type) {
    case START:
      return { ...state, start, stop, running: true };
    case TOGGLE_PAUSE:
      return state.running
        ? { ...state, stop: performance.now(), running: false }
        : {
            current: state.stop - state.start + state.current,
            start: performance.now(),
            stop: performance.now(),
            running: true
          };
    case RESET:
      return { ...state, start, stop, running: true };
    case DEFEAT:
      return {
        ...state,
        stop: performance.now(),
        running: false
      };
    default:
      return state;
  }
}
