import React, { memo } from "react";
import { useDispatch } from "react-redux";
import useKeyPress from "../../hooks/use-key-press";
import { rotate } from "../../redux/ducks/active-block";
import MainButton from "./main-button";

function RotateButton({ style }) {
  const dispatch = useDispatch();
  const rotateBlock = () => dispatch(rotate());
  const pressed = useKeyPress({ targetKey: "ArrowUp", callback: rotateBlock });
  return (
    <MainButton
      style={style}
      onClick={rotateBlock}
      pressed={pressed}
      text="Rotate"
    />
  );
}

export default memo(RotateButton);
