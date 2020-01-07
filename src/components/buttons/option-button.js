import React from "react";
import styles from "./button.module.css";

export default function OptionButton({ style, text, pressed, btnRef }) {
  return (
    <div style={style} className={`${styles["button-container"]}`}>
      <button
        className={`
        ${styles["tetris-option-button"]} ${
          styles["tetris-option-button__dark"]
        }
        ${pressed && styles["tetris-option-button__active"]} ${pressed &&
          styles["tetris-option-button__dark__active"]}
        `}
        ref={btnRef}
      ></button>
      <div>{text}</div>
    </div>
  );
}
