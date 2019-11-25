import React, { memo } from "react";
import { useDispatch } from "react-redux";
import useKeyPress from "../../hooks/use-key-press";
import { moveRight } from "../../redux/ducks/active-block";
import MainButton from "./main-button";

function RightButton({ style }) {
  const dispatch = useDispatch();
  const right = () => dispatch(moveRight());
  const pressed = useKeyPress("ArrowRight", right, true);
  return (
    <MainButton style={style} onClick={right} pressed={pressed} text="Right" />
  );
}

export default memo(RightButton);
