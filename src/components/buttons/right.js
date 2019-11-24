import React, { memo } from "react";
import { useDispatch } from "react-redux";
import styles from "./button.module.css";
import useKeyPress from "../../hooks/use-key-press";
import { moveRight } from "../../redux/ducks/active-block";

function RightButton({ style }) {
  const dispatch = useDispatch();
  const right = () => dispatch(moveRight());
  const pressed = useKeyPress("ArrowRight", right, true);
  return (
    <div style={style} className={`${styles["button-container"]}`}>
      <button
        className={`
        ${styles["tetris-button"]} ${styles["tetris-button__dark"]}
        ${pressed && styles["tetris-button__active"]} ${pressed &&
          styles["tetris-button__dark__active"]}
        `}
        onClick={right}
      ></button>
      <span>Right</span>
    </div>
  );
}

export default memo(RightButton);
