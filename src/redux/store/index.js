import { createStore, applyMiddleware } from "redux";
import reducer from "../reduser";
import collisionCheck from "../middlewares/collision-check";
import destroyRow from "../middlewares/destroy-row";
import gameStateChecker from "../middlewares/game-state-checker";
import blockLocker from "../middlewares/block-locker";

const middlewares = applyMiddleware(
  gameStateChecker,
  collisionCheck,
  blockLocker,
  destroyRow
);
const store = createStore(reducer, middlewares);

export default store;

window.store = store;
