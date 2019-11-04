import React from "react";
import { useSelector } from "react-redux";
import {
  levelSelector,
  scoreSelector,
  linesSelector
} from "../../redux/selectors";
import PauseButton from "../buttons/pause";
import ResetButton from "../buttons/reset";

export default function Info() {
  const level = useSelector(state => levelSelector(state));
  const score = useSelector(state => scoreSelector(state));
  const lines = useSelector(state => linesSelector(state));
  return (
    <>
      <div>
        <div>{`Level: ${level}`}</div>
        <div>{`Score: ${score}`}</div>
        <div>{`Lines: ${lines}`}</div>
      </div>
      <PauseButton />
      <ResetButton />
    </>
  );
}
