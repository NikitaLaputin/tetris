import React from "react";
import styles from "./game.module.css";
import Display from "../display";
import Buttons from "../buttons";
import useTabChange from "../../hooks/use-tab-change";
import { useDispatch } from "react-redux";
import { pause } from "../../redux/ducks/game-state";

export default function Game() {
  const dispatch = useDispatch();
  const callback = () => dispatch(pause());
  useTabChange(callback);
  return (
    <div
      className={`${styles["tetris-container"]} ${styles["tetris-container__dark"]}`}
    >
      <Display />
      <Buttons />
    </div>
  );
}
