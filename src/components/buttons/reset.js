import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { reset } from "../../redux/ducks/game-state";

function ResetButton() {
  const dispatch = useDispatch();
  const resetGame = () => dispatch(reset());
  return (
    <div className="button-container">
      <button className="tetris-button" onClick={resetGame}></button>
      <span>Reset</span>
    </div>
  );
}

export default memo(ResetButton);
