/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from "react";
import drawTetrimino from "../helpers/draw-tetrimino";
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
import drawField from "../helpers/draw-field";
import { togglePause } from "../../redux/ducks/game-state";

export default function Field() {
  const canvasWidth = 200;
  const canvasHeigth = 400;
  const side = 20;
  const canvasRef = useRef(null);
  const { block, field, speed } = useSelector(state => ({
    block: blockSelector(state),
    field: fieldSelector(state),
    speed: speedSelector(state)
  }));
  const dispatch = useDispatch();
  const right = () => dispatch(moveRight());
  const left = () => dispatch(moveLeft());
  const down = () => dispatch(moveDown());
  const rotateTetrimino = () => dispatch(rotate());
  const togglePauseGame = () => dispatch(togglePause());
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvasWidth, canvasHeigth);
    drawField({ field, ctx, side });
    drawTetrimino({
      block,
      ctx,
      side
    });
  }, [block, field]);
  useKey("ArrowRight", right, true);
  useKey("ArrowLeft", left, true);
  const pressedDown = useKey("ArrowDown", down, true);
  useKey("ArrowUp", rotateTetrimino);
  useKey("p", togglePauseGame);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!pressedDown) down();
    }, speed);
    return () => clearInterval(intervalId);
  }, [speed, pressedDown]);

  return <canvas ref={canvasRef} width={canvasWidth} height={canvasHeigth} />;
}
