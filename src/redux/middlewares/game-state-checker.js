import { GAME_OVER, GAME_PAUSED, NOT_STARTED } from '../../utils/consts';
import { TOGGLE_PAUSE, RESET, START } from '../ducks/game-state';

const alwaysDispatch = [START, RESET];

export default store => next => action => {
  const { status } = store.getState().gameState;
  const { type } = action;

  if (alwaysDispatch.includes(type)) return next(action);

  if (
    status === GAME_OVER ||
    status === NOT_STARTED ||
    (status === GAME_PAUSED && type !== TOGGLE_PAUSE)
  ) {
    return;
  }

  return next(action);
};
