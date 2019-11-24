import React from "react";
import styles from "./game.module.css";
import Display from "../display";
import Buttons from "../buttons";

export default function Game() {
  return (
    <div
      className={`${styles["tetris-container"]} ${styles["tetris-container__dark"]}`}
    >
      <Display />
      <Buttons />
    </div>
  );
}
