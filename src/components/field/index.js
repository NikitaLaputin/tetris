/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from "react";
import useDrawTetramino from "../../hooks/use-draw-tetramino";
import { useSelector, useDispatch } from "react-redux";
import {
  blockSelector,
  fieldSelector,
  speedSelector
} from "../../redux/selectors";
import useKey from "../../hooks/use-key-press";
import {
  moveRight,
  moveLeft,
  moveDown,
  rotate
} from "../../redux/ducks/active-block";
import useDrawField from "../../hooks/use-draw-field";
import { togglePause } from "../../redux/ducks/game-state";

export default function Field() {
  const canvasWidth = 200;
  const canvasHeigth = 400;
  const side = 20;
  const canvasRef = useRef(null);
  const block = useSelector(state => blockSelector(state));
  const field = useSelector(state => fieldSelector(state));
  const speed = useSelector(state => speedSelector(state));
  const dispatch = useDispatch();
  const right = () => dispatch(moveRight());
  const left = () => dispatch(moveLeft());
  const down = () => dispatch(moveDown());
  const rotateTetramino = () => dispatch(rotate());
  const togglePauseGame = () => dispatch(togglePause());
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvasWidth, canvasHeigth);
  }, [block, field]);
  useDrawTetramino({
    block,
    canvasRef,
    side
  });
  useDrawField({
    field,
    canvasRef,
    side,
    refresh: block
  });
  useKey("ArrowRight", right);
  useKey("ArrowLeft", left);
  useKey("ArrowDown", down);
  useKey("ArrowUp", rotateTetramino);
  useKey("p", togglePauseGame);
  useEffect(() => {
    const intervalId = setInterval(() => {
      down();
    }, speed);
    return () => clearInterval(intervalId);
  }, [speed]);

  return (
    <canvas ref={canvasRef} width={canvasWidth} height={canvasHeigth}></canvas>
  );
}
