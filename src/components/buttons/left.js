import React, { memo } from "react";
import { useDispatch } from "react-redux";
import useKeyPress from "../../hooks/use-key-press";
import { moveLeft } from "../../redux/ducks/active-block";
import MainButton from "./main-button";

function LeftButton({ style }) {
  const dispatch = useDispatch();
  const left = () => dispatch(moveLeft());
  const pressed = useKeyPress("ArrowLeft", left, true);
  return (
    <MainButton style={style} onClick={left} pressed={pressed} text="Left" />
  );
}

export default memo(LeftButton);
