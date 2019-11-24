import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { togglePause } from "../../redux/ducks/game-state";
import { gameStatusSelector } from "../../redux/selectors";
import { IN_PROGRESS, GAME_PAUSED } from "../../utils/consts";
import styles from "./button.module.css";

function PauseButton() {
  const dispatch = useDispatch();
  const togglePauseGame = () => dispatch(togglePause());
  const gameStatus = useSelector(state => gameStatusSelector(state));
  if (gameStatus !== IN_PROGRESS && gameStatus !== GAME_PAUSED) return null;
  return (
    <div className={`${styles["button-container"]}`}>
      <button
        className={`${styles["tetris-button"]} ${styles["tetris-button__dark"]}`}
        onClick={togglePauseGame}
      ></button>
      <span>{gameStatus === IN_PROGRESS ? "Pause" : "Resume"}</span>
    </div>
  );
}

export default memo(PauseButton);
