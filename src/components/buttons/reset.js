import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { reset } from "../../redux/ducks/game-state";

function ResetButton() {
  const dispatch = useDispatch();
  const resetGame = () => dispatch(reset());
  return (
    <button className="tetris-button" onClick={resetGame}>
      Reset
    </button>
  );
}

export default memo(ResetButton);
