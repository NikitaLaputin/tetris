import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { togglePause } from "../../redux/ducks/game-state";
import useKeyPress from "../../hooks/use-key-press";
import OptionButton from "./option-button";

function PauseButton({ style }) {
  const dispatch = useDispatch();
  const togglePauseGame = () => dispatch(togglePause());
  const pressed = useKeyPress({ targetKey: "p", callback: togglePauseGame });
  return (
    <OptionButton
      style={style}
      onClick={togglePauseGame}
      pressed={pressed}
      text="Pause"
    />
  );
}

export default memo(PauseButton);
