/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from "react";
import drawTetrimino from "../helpers/draw-tetrimino";
import { useSelector, useDispatch } from "react-redux";
import {
  blockSelector,
  fieldSelector,
  speedSelector,
  gameStateSelector
} from "../../redux/selectors";
import useKey from "../../hooks/use-key-press";
import { moveDown } from "../../redux/ducks/active-block";
import drawField from "../helpers/draw-field";
import { RESET, START, PAUSE, RESUME } from "../../redux/ducks/game-state";
import useInterval from "../../hooks/use-interval";
import styles from "./field.module.css";

export default function Field() {
  const canvasWidth = 200;
  const canvasHeigth = 400;
  const side = 20;
  const canvasRef = useRef(null);
  const { block, field, speed, gameState } = useSelector(state => ({
    block: blockSelector(state),
    field: fieldSelector(state),
    speed: speedSelector(state),
    gameState: gameStateSelector(state)
  }));
  const { lastAction } = gameState;
  const dispatch = useDispatch();
  const down = () => dispatch(moveDown());
  const { start, pause, resume, reset } = useInterval(down, speed);
  const pressedDown = useKey("ArrowDown");

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
  }, [gameState]);

  useEffect(() => {
    if (pressedDown) pause();
    else resume();
  }, [pressedDown]);

  return (
    <div
      className={`${styles["canvas-container"]} ${styles["canvas-container__dark"]}`}
      style={{ maxHeight: 400 }}
    >
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeigth} />
    </div>
  );
}
