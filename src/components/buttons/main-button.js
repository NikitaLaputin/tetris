import React from "react";
import styles from "./button.module.css";

function MainButton({ style, btnRef, pressed, text }) {
  return (
    <div style={style} className={`${styles["button-container"]}`}>
      <button
        className={`
        ${styles["tetris-button"]} ${styles["tetris-button__dark"]}
        ${pressed && styles["tetris-button__active"]} ${pressed &&
          styles["tetris-button__dark__active"]}
        `}
        tabIndex="-1"
        ref={btnRef}
      ></button>
      <span>{text}</span>
    </div>
  );
}

export default MainButton;
