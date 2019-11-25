import React, { memo } from "react";
import styles from "./button.module.css";

function MainButton({ style, onClick, pressed, text }) {
  const clickHandle = e => {
    e.target.blur();
    onClick();
    console.log(e.target);
  };
  return (
    <div style={style} className={`${styles["button-container"]}`}>
      <button
        className={`
        ${styles["tetris-button"]} ${styles["tetris-button__dark"]}
        ${pressed && styles["tetris-button__active"]} ${pressed &&
          styles["tetris-button__dark__active"]}
        `}
        onClick={e => clickHandle(e)}
        tabIndex="-1"
      ></button>
      <span>{text}</span>
    </div>
  );
}

export default memo(MainButton);
