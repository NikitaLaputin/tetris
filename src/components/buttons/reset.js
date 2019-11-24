import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { reset } from "../../redux/ducks/game-state";
import styles from "./button.module.css";

function ResetButton() {
  const dispatch = useDispatch();
  const resetGame = () => dispatch(reset());
  return (
    <div className={`${styles["button-container"]}`}>
      <button
        className={`${styles["tetris-button"]} ${styles["tetris-button__dark"]}`}
        onClick={resetGame}
      ></button>
      <span>Reset</span>
    </div>
  );
}

export default memo(ResetButton);
