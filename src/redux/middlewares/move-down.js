import { moveDown, MOVE_LOCK, MOVE_UNLOCK } from "../ducks/active-block";
import {
  RESET,
  PAUSE,
  RESUME,
  DEFEAT,
  ROWS_DESTROYED
} from "../ducks/game-state";
import { Interval } from "../../utils";
import { speedSelector } from "../selectors";

export default store => next => action => {
  const callback = () => next(moveDown());
  const { type } = action;
  const speed = speedSelector(store.getState());
  switch (type) {
    case RESET:
      Interval.set(callback, speed);
      return next(action);
    case PAUSE:
      Interval.pause(callback);
      return next(action);
    case RESUME:
      Interval.resume(callback);
      return next(action);
    case DEFEAT:
      Interval.clear(callback);
      return next(action);
    case MOVE_LOCK:
      Interval.clear(callback);
      return next(action);
    case MOVE_UNLOCK:
      Interval.set(callback, speed);
      return next(action);
    case ROWS_DESTROYED:
      const speedBefore = speedSelector(store.getState());
      next(action);
      const speedAfter = speedSelector(store.getState());
      if (speedBefore !== speedAfter) {
        Interval.clear(callback);
        Interval.set(callback, speedAfter);
      }
      break;
    default:
      return next(action);
  }
};
