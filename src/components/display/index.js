import React, { memo } from "react";
import styles from "./display.module.css";
import Field from "../field";
import Info from "../info";

const Display = () => (
  <div className={styles["display-container"]}>
    <Field />
    <Info />
  </div>
);

export default memo(Display);
