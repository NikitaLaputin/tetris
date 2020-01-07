import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import useKeyPress from "../../hooks/use-key-press";
import {
  moveDown,
  movementLock,
  movementUnlock
} from "../../redux/ducks/active-block";
import MainButton from "./main-button";

function DownButton({ style }) {
  const dispatch = useDispatch();
  const callback = () => dispatch(moveDown());
  const targetButton = useRef();
  const pressed = useKeyPress({
    targetKey: "ArrowDown",
    callback,
    continious: true,
    frequency: 75,
    targetButton
  });
  useEffect(() => {
    dispatch(pressed ? movementLock() : movementUnlock());
  }, [dispatch, pressed]);
  return (
    <MainButton
      style={style}
      pressed={pressed}
      btnRef={targetButton}
      text="Down"
    />
  );
}

export default DownButton;
