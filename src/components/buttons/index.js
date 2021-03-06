import React from "react";
import Start from "./start";
import Pause from "./pause";
import styles from "./button.module.css";
import Left from "./left";
import Right from "./right";
import Rotate from "./rotate";
import Down from "./down";
import Drop from "./drop";

export default function Buttons() {
  return (
    <div className={styles["buttons-container"]}>
      <Start style={{ gridArea: "start" }} />
      <Pause style={{ gridArea: "pause" }} />
      <Rotate style={{ gridArea: "start / start / rotate / rotate" }} />
      <Left style={{ gridArea: "left" }} />
      <Down style={{ gridArea: "down" }} />
      <Right style={{ gridArea: "right" }} />
      <Drop style={{ gridArea: "drop" }} />
    </div>
  );
}
