import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { start } from "../../redux/ducks/game-state";
import { gameStatusSelector } from "../../redux/selectors";
import { NOT_STARTED } from "../../utils/consts";

function StartButton() {
  const dispatch = useDispatch();
  const startGame = () => dispatch(start());
  const gameStatus = useSelector(state => gameStatusSelector(state));
  if (gameStatus === NOT_STARTED)
    return <button onClick={startGame}>Start</button>;
  return null;
}

export default memo(StartButton);
