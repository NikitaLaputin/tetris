import React from "react";
import Field from "../field";
import Info from "../info";
import styles from "./game.module.css";

export default function Game() {
  return (
    <div
      className={`${styles["tetris-container"]} ${styles["tetris-container__dark"]}`}
    >
      <Field />
      <Info />
    </div>
  );
}
