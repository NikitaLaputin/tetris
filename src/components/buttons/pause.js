import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { togglePause } from "../../redux/ducks/game-state";
import { gameStatusSelector } from "../../redux/selectors";
import { IN_PROGRESS, GAME_PAUSED } from "../../utils/consts";

export default function PauseButton() {
  const dispatch = useDispatch();
  const togglePauseGame = () => dispatch(togglePause());
  const gameStatus = useSelector(state => gameStatusSelector(state));
  if (gameStatus === IN_PROGRESS)
    return <button onClick={togglePauseGame}>Pause</button>;
  if (gameStatus === GAME_PAUSED)
    return <button onClick={togglePauseGame}>Resume</button>;
  return null;
}
