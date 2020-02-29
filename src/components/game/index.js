import React, { memo } from "react";
import { useDispatch } from "react-redux";

import Display from "../display";
import Buttons from "../buttons";
import useTabChange from "../../hooks/use-tab-change";
import { pause } from "../../redux/ducks/game-state";

import styles from "./game.module.css";

const Game = () => {
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
};

export default memo(Game);
