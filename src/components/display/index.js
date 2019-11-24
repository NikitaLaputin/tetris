import React from "react";
import styles from "./display.module.css";
import Field from "../field";
import Info from "../info";

export default function Display() {
  return (
    <div className={styles["display-container"]}>
      <Field />
      <Info />
    </div>
  );
}
