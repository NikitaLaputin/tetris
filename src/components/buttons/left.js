import React, { memo } from "react";
import { useDispatch } from "react-redux";
import styles from "./button.module.css";
import useKeyPress from "../../hooks/use-key-press";
import { moveLeft } from "../../redux/ducks/active-block";

function LeftButton({ style }) {
  const dispatch = useDispatch();
  const left = () => dispatch(moveLeft());
  const pressed = useKeyPress("ArrowLeft", left, true);
  return (
    <div style={style} className={`${styles["button-container"]}`}>
      <button
        className={`
        ${styles["tetris-button"]} ${styles["tetris-button__dark"]}
        ${pressed && styles["tetris-button__active"]} ${pressed &&
          styles["tetris-button__dark__active"]}
        `}
        onClick={left}
      ></button>
      <span>Left</span>
    </div>
  );
}

export default memo(LeftButton);
