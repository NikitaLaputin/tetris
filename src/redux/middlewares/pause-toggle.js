import { TOGGLE_PAUSE, resume, pause } from '../ducks/game-state';
import { GAME_PAUSED, IN_PROGRESS } from '../../utils/consts';

export default store => next => action => {
  const { type } = action;

  if (type === TOGGLE_PAUSE) {
    const { status } = store.getState().gameState;

    if (status === GAME_PAUSED) {
      return next(resume());
    } else {
      if (status === IN_PROGRESS) return next(pause());
    }
  }

  return next(action);
};
