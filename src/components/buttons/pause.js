import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { togglePause } from "../../redux/ducks/game-state";
import { gameStatusSelector } from "../../redux/selectors";
import { IN_PROGRESS, GAME_PAUSED } from "../../utils/consts";

function PauseButton() {
  const dispatch = useDispatch();
  const togglePauseGame = () => dispatch(togglePause());
  const gameStatus = useSelector(state => gameStatusSelector(state));
  if (gameStatus !== IN_PROGRESS && gameStatus !== GAME_PAUSED) return null;
  return (
    <div className="button-container">
      <button className="tetris-button" onClick={togglePauseGame}></button>
      <span>{gameStatus === IN_PROGRESS ? "Pause" : "Resume"}</span>
    </div>
  );
}

export default memo(PauseButton);
