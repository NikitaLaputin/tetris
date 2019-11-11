import { createStore, applyMiddleware } from "redux";
import reducer from "../reduser";
import collisionCheck from "../middlwares/collision-check";
import destroyRow from "../middlwares/destroy-row";
import gameStateChecker from "../middlwares/game-state-checker";
import blockLocker from "../middlwares/block-locker";

const middlewares = applyMiddleware(
  gameStateChecker,
  collisionCheck,
  blockLocker,
  destroyRow
);
const store = createStore(reducer, middlewares);

export default store;

window.store = store;
