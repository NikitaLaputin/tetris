import React, { memo } from "react";
import { useDispatch } from "react-redux";
import useKeyPress from "../../hooks/use-key-press";
import { moveDown } from "../../redux/ducks/active-block";
import MainButton from "./main-button";

function DownButton({ style }) {
  const dispatch = useDispatch();
  const down = () => dispatch(moveDown());
  const pressed = useKeyPress("ArrowDown", down, true, 75);
  return (
    <MainButton style={style} onClick={down} pressed={pressed} text="Down" />
  );
}

export default memo(DownButton);
