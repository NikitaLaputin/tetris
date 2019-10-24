import { createStore, applyMiddleware } from "redux";
import reducer from "../reduser";
import collisionCheck from "../middlwares/collision-check";

const middlewares = applyMiddleware(collisionCheck);
const store = createStore(reducer, middlewares);

export default store;

window.store = store;
