import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { reset } from "../../redux/ducks/game-state";
import useKeyPress from "../../hooks/use-key-press";
import OptionButton from "./option-button";

function StartButton({ style }) {
  const dispatch = useDispatch();
  const startGame = () => dispatch(reset());
  const pressed = useKeyPress({ targetKey: "s", callback: startGame });
  return (
    <OptionButton
      style={style}
      onClick={startGame}
      pressed={pressed}
      text="Start"
    />
  );
}

export default memo(StartButton);
