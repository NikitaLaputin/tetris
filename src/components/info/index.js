import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  levelSelector,
  scoreSelector,
  linesSelector,
  timerSelector
} from "../../redux/selectors";
import PauseButton from "../buttons/pause";
import ResetButton from "../buttons/reset";
import StartButton from "../buttons/start";
import NextBlock from "../next-block";

export default function Info() {
  const level = useSelector(state => levelSelector(state));
  const score = useSelector(state => scoreSelector(state));
  const lines = useSelector(state => linesSelector(state));
  const timer = useSelector(state => timerSelector(state));
  const { start, stop, current, running } = timer;
  const startTime = Math.floor((stop - start + current) / 1000);
  const [time, setTime] = useState(startTime);
  useEffect(() => {
    setTime(startTime);
    const interval = setInterval(() => {
      if (running) setTime(time => time + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [running, startTime, start]);
  return (
    <>
      <div>
        <div>{`Level: ${level}`}</div>
        <div>{`Score: ${score}`}</div>
        <div>{`Lines: ${lines}`}</div>
        <div>{`Time: ${time}`}</div>
      </div>
      <NextBlock />
      <StartButton />
      <PauseButton />
      <ResetButton />
    </>
  );
}
