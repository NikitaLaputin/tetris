import React from "react";
import { useDispatch } from "react-redux";
import { reset } from "../../redux/ducks/game-state";

export default function ResetButton() {
  const dispatch = useDispatch();
  const resetGame = () => dispatch(reset());
  return <button onClick={resetGame}>Reset</button>;
}
