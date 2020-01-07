import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import useKeyPress from "../../hooks/use-key-press";
import { moveRight } from "../../redux/ducks/active-block";
import MainButton from "./main-button";

function RightButton({ style }) {
  const dispatch = useDispatch();
  const callback = () => dispatch(moveRight());
  const targetButton = useRef();
  const pressed = useKeyPress({
    targetKey: "ArrowRight",
    callback,
    continious: true,
    targetButton
  });
  return (
    <MainButton
      style={style}
      pressed={pressed}
      btnRef={targetButton}
      text="Right"
    />
  );
}

export default RightButton;
