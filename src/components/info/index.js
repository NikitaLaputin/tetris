import React from "react";
import { useSelector } from "react-redux";
import { levelSelector, scoreSelector } from "../../redux/selectors";

export default function Info() {
  const level = useSelector(state => levelSelector(state));
  const score = useSelector(state => scoreSelector(state));
  return (
    <div>
      <div>{`Level: ${level}`}</div>
      <div>{`Score: ${score}`}</div>
    </div>
  );
}
