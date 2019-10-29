import { createStore, applyMiddleware } from "redux";
import reducer from "../reduser";
import collisionCheck from "../middlwares/collision-check";
import destroyRow from "../middlwares/destroy-row";

const middlewares = applyMiddleware(collisionCheck, destroyRow);
const store = createStore(reducer, middlewares);

export default store;

window.store = store;
