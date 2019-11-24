import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { togglePause } from "../../redux/ducks/game-state";
import styles from "./button.module.css";
import useKeyPress from "../../hooks/use-key-press";

function PauseButton() {
  const dispatch = useDispatch();
  const togglePauseGame = () => dispatch(togglePause());
  const pressed = useKeyPress("p", togglePauseGame);
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
        onClick={togglePauseGame}
      ></button>
      <span>Pause</span>
    </div>
  );
}

export default memo(PauseButton);
