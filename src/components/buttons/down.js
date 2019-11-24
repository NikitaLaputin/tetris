import React, { memo } from "react";
import { useDispatch } from "react-redux";
import styles from "./button.module.css";
import useKeyPress from "../../hooks/use-key-press";
import { moveDown } from "../../redux/ducks/active-block";

function DownButton({ style }) {
  const dispatch = useDispatch();
  const down = () => dispatch(moveDown());
  const pressed = useKeyPress("ArrowDown", down, true, 75);
  return (
    <div style={style} className={`${styles["button-container"]}`}>
      <button
        className={`
        ${styles["tetris-button"]} ${styles["tetris-button__dark"]}
        ${pressed && styles["tetris-button__active"]} ${pressed &&
          styles["tetris-button__dark__active"]}
        `}
        onClick={down}
      ></button>
      <span>Down</span>
    </div>
  );
}

export default memo(DownButton);
