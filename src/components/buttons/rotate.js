import React, { memo } from "react";
import { useDispatch } from "react-redux";
import styles from "./button.module.css";
import useKeyPress from "../../hooks/use-key-press";
import { rotate } from "../../redux/ducks/active-block";

function RotateButton({ style }) {
  const dispatch = useDispatch();
  const rotateBlock = () => dispatch(rotate());
  const pressed = useKeyPress("ArrowUp", rotateBlock);
  return (
    <div style={style} className={`${styles["button-container"]}`}>
      <button
        className={`
        ${styles["tetris-button"]} ${styles["tetris-button__dark"]}
        ${pressed && styles["tetris-button__active"]} ${pressed &&
          styles["tetris-button__dark__active"]}
        `}
        onClick={rotateBlock}
      ></button>
      <span>Rotate</span>
    </div>
  );
}

export default memo(RotateButton);
