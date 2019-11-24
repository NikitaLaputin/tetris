import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { start } from "../../redux/ducks/game-state";
import { gameStatusSelector } from "../../redux/selectors";
import { NOT_STARTED } from "../../utils/consts";
import styles from "./button.module.css";

function StartButton() {
  const dispatch = useDispatch();
  const startGame = () => dispatch(start());
  const gameStatus = useSelector(state => gameStatusSelector(state));
  if (gameStatus === NOT_STARTED)
    return (
      <div className={`${styles["button-container"]}`}>
        <button
          className={`${styles["tetris-button"]} ${styles["tetris-button__dark"]}`}
          onClick={startGame}
        ></button>
        <span>Start</span>
      </div>
    );
  return null;
}

export default memo(StartButton);
