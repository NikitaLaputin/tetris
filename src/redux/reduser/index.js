import { combineReducers } from "redux";
import activeBlock from "../ducks/active-block";
import field from "../ducks/field";
import nextBlock from "../ducks/next-block";
import gameState from "../ducks/game-state";

export default combineReducers({
  activeBlock,
  field,
  nextBlock,
  gameState
});
