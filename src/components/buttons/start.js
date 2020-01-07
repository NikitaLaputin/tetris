import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { reset } from "../../redux/ducks/game-state";
import useKeyPress from "../../hooks/use-key-press";
import OptionButton from "./option-button";

function StartButton({ style }) {
  const dispatch = useDispatch();
  const startGame = () => dispatch(reset());
  const targetButton = useRef();
  const pressed = useKeyPress({
    targetKey: "s",
    callback: startGame,
    targetButton
  });
  return (
    <OptionButton
      style={style}
      btnRef={targetButton}
      pressed={pressed}
      text="Start"
    />
  );
}

export default StartButton;
