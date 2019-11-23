/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback, memo } from "react";
import { useSelector } from "react-redux";
import {
  levelSelector,
  scoreSelector,
  linesSelector,
  gameLastActionSelector
} from "../../redux/selectors";
import PauseButton from "../buttons/pause";
import ResetButton from "../buttons/reset";
import StartButton from "../buttons/start";
import NextBlock from "../next-block";
import useInterval from "../../hooks/use-interval";
import { START, RESET, PAUSE, RESUME } from "../../redux/ducks/game-state";

function Info() {
  const { level, score, lines, lastAction } = useSelector(state => ({
    level: levelSelector(state),
    score: scoreSelector(state),
    lines: linesSelector(state),
    lastAction: gameLastActionSelector(state)
  }));
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
  }, [lastAction]);

  return (
    <div>
      <div className="canvas-container info-container">
        <div>{`Level: ${level}`}</div>
        <div>{`Score: ${score}`}</div>
        <div>{`Lines: ${lines}`}</div>
        <div>{`Time: ${time}`}</div>
      </div>
      <NextBlock />
      <StartButton />
      <PauseButton />
      <ResetButton />
    </div>
  );
}

export default memo(Info);
