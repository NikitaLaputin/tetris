import React from "react";
import Start from "./start";
import Pause from "./pause";
import styles from "./button.module.css";
import Left from "./left";
import Right from "./right";
import Rotate from "./rotate";
import Down from "./down";

export default function Buttons() {
  return (
    <div>
      <div className={styles["buttons-container-top"]}>
        <Pause />
        <Start />
      </div>
      <div className={styles["buttons-container-bottom"]}>
        <Rotate style={{ gridArea: "a" }} />
        <Left style={{ gridArea: "b" }} />
        <Down style={{ gridArea: "c" }} />
        <Right style={{ gridArea: "d" }} />
      </div>
    </div>
  );
}
