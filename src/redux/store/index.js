import { createStore, applyMiddleware, compose } from "redux";
import reducer from "../reduser";
import collisionCheck from "../middlewares/collision-check";
import destroyRow from "../middlewares/destroy-row";
import gameStateChecker from "../middlewares/game-state-checker";
import blockLocker from "../middlewares/block-locker";
import pauseToggle from "../middlewares/pause-toggle";
import moveDown from "../middlewares/move-down";
import { loadHighScore } from "../../localstorage";

const middlewares = [
  gameStateChecker,
  pauseToggle,
  moveDown,
  collisionCheck,
  blockLocker,
  destroyRow
];
const isDev = process.env.NODE_ENV === "development";
const highScore = loadHighScore();
const enhancer = applyMiddleware(...middlewares);
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : f => f;
const store = createStore(
  reducer,
  { ...reducer, highScore },
  isDev ? compose(enhancer, devTools) : enhancer
);

export default store;
