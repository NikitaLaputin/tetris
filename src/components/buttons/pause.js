import React, { useRef, memo } from "react";
import { useDispatch } from "react-redux";
import { togglePause } from "../../redux/ducks/game-state";
import useKeyPress from "../../hooks/use-key-press";
import OptionButton from "./option-button";

const PauseButton = ({ style }) => {
  const dispatch = useDispatch();
  const togglePauseGame = () => dispatch(togglePause());
  const targetButton = useRef();
  const pressed = useKeyPress({
    targetKey: "p",
    callback: togglePauseGame,
    targetButton
  });

  return (
    <OptionButton
      style={style}
      btnRef={targetButton}
      pressed={pressed}
      text="Pause"
    />
  );
};

export default memo(PauseButton);
