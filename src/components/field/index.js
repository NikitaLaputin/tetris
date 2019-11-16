/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from "react";
import drawTetrimino from "../helpers/draw-tetrimino";
import { useSelector, useDispatch } from "react-redux";
import {
  blockSelector,
  fieldSelector,
  speedSelector,
  gameStatusSelector,
  gameLastActionSelector
} from "../../redux/selectors";
import useKey from "../../hooks/use-key-press";
import {
  moveRight,
  moveLeft,
  moveDown,
  rotate
} from "../../redux/ducks/active-block";
import drawField from "../helpers/draw-field";
import {
  togglePause,
  RESET,
  START,
  PAUSE,
  RESUME
} from "../../redux/ducks/game-state";
import useInterval from "../../hooks/use-interval";
import { GAME_PAUSED, IN_PROGRESS } from "../../utils/consts";

export default function Field() {
  const canvasWidth = 200;
  const canvasHeigth = 400;
  const side = 20;
  const canvasRef = useRef(null);
  const { block, field, speed, lastAction } = useSelector(state => ({
    block: blockSelector(state),
    field: fieldSelector(state),
    speed: speedSelector(state),
    lastAction: gameLastActionSelector(state)
  }));
  const dispatch = useDispatch();
  const right = () => dispatch(moveRight());
  const left = () => dispatch(moveLeft());
  const down = () => dispatch(moveDown());
  const rotateTetrimino = () => dispatch(rotate());
  const togglePauseGame = () => dispatch(togglePause());
  const { start, pause, resume, reset } = useInterval(down, speed);
  useKey("ArrowRight", right, true);
  useKey("ArrowLeft", left, true);
  const pressedDown = useKey("ArrowDown", down, true);
  useKey("ArrowUp", rotateTetrimino);
  useKey("p", togglePauseGame);

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

  useEffect(() => {
    if (lastAction === START) {
      start();
    }
    if (lastAction === RESET) {
      reset();
    }
    if (lastAction === PAUSE) {
      pause();
    }
    if (lastAction === RESUME) {
      resume();
    }
  }, [lastAction]);

  useEffect(() => {
    if (pressedDown) pause();
    else resume();
  }, [pressedDown]);

  return <canvas ref={canvasRef} width={canvasWidth} height={canvasHeigth} />;
}
