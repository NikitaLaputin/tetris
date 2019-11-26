import React, { memo } from "react";
import { useDispatch } from "react-redux";
import useKeyPress from "../../hooks/use-key-press";
import { drop } from "../../redux/ducks/active-block";
import MainButton from "./main-button";

function DropButton({ style }) {
  const dispatch = useDispatch();
  const dropBlock = () => dispatch(drop());
  const pressed = useKeyPress({ targetKey: " ", callback: dropBlock });
  return (
    <MainButton
      style={style}
      onClick={dropBlock}
      pressed={pressed}
      text="Drop"
    />
  );
}

export default memo(DropButton);
