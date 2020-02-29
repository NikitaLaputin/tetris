import React, { useRef, memo } from "react";
import { useDispatch } from "react-redux";
import useKeyPress from "../../hooks/use-key-press";
import { rotate } from "../../redux/ducks/active-block";
import MainButton from "./main-button";

const RotateButton = ({ style }) => {
  const dispatch = useDispatch();
  const rotateBlock = () => dispatch(rotate());
  const targetButton = useRef();
  const pressed = useKeyPress({
    targetKey: "ArrowUp",
    callback: rotateBlock,
    targetButton
  });

  return (
    <MainButton
      style={style}
      btnRef={targetButton}
      pressed={pressed}
      text="Rotate"
    />
  );
};

export default memo(RotateButton);
