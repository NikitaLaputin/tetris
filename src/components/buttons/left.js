import React, { memo, useRef } from "react";
import { useDispatch } from "react-redux";
import useKeyPress from "../../hooks/use-key-press";
import { moveLeft } from "../../redux/ducks/active-block";
import MainButton from "./main-button";

function LeftButton({ style }) {
  const dispatch = useDispatch();
  const callback = () => dispatch(moveLeft());
  const targetButton = useRef();
  const pressed = useKeyPress({
    targetKey: "ArrowLeft",
    callback,
    continious: true,
    targetButton
  });
  return (
    <MainButton
      style={style}
      btnRef={targetButton}
      pressed={pressed}
      text="Left"
    />
  );
}

export default memo(LeftButton);
