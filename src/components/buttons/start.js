import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { reset } from "../../redux/ducks/game-state";
import styles from "./button.module.css";
import useKeyPress from "../../hooks/use-key-press";

function StartButton() {
  const dispatch = useDispatch();
  const startGame = () => dispatch(reset());
  const pressed = useKeyPress("s", startGame);
  return (
    <div className={`${styles["button-container"]}`}>
      <button
        className={`
        ${styles["tetris-option-button"]} ${
          styles["tetris-option-button__dark"]
        }
        ${pressed && styles["tetris-option-button__active"]} ${pressed &&
          styles["tetris-option-button__dark__active"]}
        `}
        onClick={startGame}
      ></button>
      <span>Start</span>
    </div>
  );
}

export default memo(StartButton);
