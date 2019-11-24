/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback, memo } from "react";
import { useSelector } from "react-redux";
import {
  levelSelector,
  scoreSelector,
  linesSelector,
  gameStateSelector
} from "../../redux/selectors";
import PauseButton from "../buttons/pause";
import ResetButton from "../buttons/reset";
import StartButton from "../buttons/start";
import NextBlock from "../next-block";
import useInterval from "../../hooks/use-interval";
import { START, RESET, PAUSE, RESUME } from "../../redux/ducks/game-state";
import canvasStyles from "../field/field.module.css";
import styles from "./info.module.css";

function Info() {
  const { level, score, lines, gameState } = useSelector(state => ({
    level: levelSelector(state),
    score: scoreSelector(state),
    lines: linesSelector(state),
    gameState: gameStateSelector(state)
  }));
  const { lastAction } = gameState;
  const [time, setTime] = useState(0);
  const incrementTime = useCallback(() => {
    setTime(time => time + 1);
  }, []);
  const { start, pause, resume, reset } = useInterval(incrementTime, 1000);

  useEffect(() => {
    if (lastAction === START) {
      start();
    }
    if (lastAction === RESET) {
      reset();
      setTime(0);
    }
    if (lastAction === PAUSE) {
      pause();
    }
    if (lastAction === RESUME) {
      resume();
    }
  }, [gameState]);

  return (
    <div>
      <div
        className={`${canvasStyles.container} ${canvasStyles.container__dark} ${styles.info}`}
      >
        <div>{`Level: ${level}`}</div>
        <div>{`Score: ${score}`}</div>
        <div>{`Lines: ${lines}`}</div>
        <div>{`Time: ${time}`}</div>
      </div>
      <NextBlock />
      <div
        style={{
          display: "flex",
          gridTemplateColumns: "1fr 1fr"
        }}
      >
        <StartButton />
        <PauseButton />
        <ResetButton />
      </div>
    </div>
  );
}

export default memo(Info);
