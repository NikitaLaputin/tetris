/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from "react";
import drawTetrimino from "../helpers/draw-tetrimino";
import { useSelector } from "react-redux";
import {
  blockSelector,
  fieldSelector,
  gameStateSelector,
  ghostBlockSelector
} from "../../redux/selectors";
import drawField from "../helpers/draw-field";
import styles from "./field.module.css";
import {
  NOT_STARTED,
  INVISIBLE_ROWS,
  GAME_PAUSED,
  GAME_OVER
} from "../../utils/consts";
import drawText from "../helpers/draw-text";

export default function Field() {
  const canvasWidth = 200;
  const canvasHeigth = 400;
  const side = 20;
  const canvasRef = useRef(null);
  const { block, field, ghostBlock, gameState } = useSelector(state => ({
    block: blockSelector(state),
    field: fieldSelector(state),
    ghostBlock: ghostBlockSelector(state),
    gameState: gameStateSelector(state)
  }));
  const { status } = gameState;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const position = [
      (field[0].length * side) / 2,
      ((field.length - INVISIBLE_ROWS) / 2) * side
    ];
    if (status === NOT_STARTED) {
      ctx.clearRect(0, 0, canvasWidth, canvasHeigth);
      drawText({
        ctx,
        size: 30,
        position,
        color: "#eaeaea",
        text: "PRESS START"
      });
    } else if (status === GAME_PAUSED) {
      ctx.clearRect(0, 0, canvasWidth, canvasHeigth);
      drawText({
        ctx,
        size: 30,
        position,
        color: "#eaeaea",
        text: "PAUSED"
      });
    } else {
      ctx.clearRect(0, 0, canvasWidth, canvasHeigth);
      drawField({ field, ctx, side });
      drawTetrimino({
        block: ghostBlock,
        ctx,
        side,
        ghost: true
      });
      drawTetrimino({
        block,
        ctx,
        side
      });
      if (status === GAME_OVER) {
        drawText({
          ctx,
          size: 30,
          position,
          color: "#eaeaea",
          text: "GAME OVER"
        });
      }
    }
  }, [block, field, status]);

  return (
    <div
      className={`${styles["canvas-container"]} ${styles["canvas-container__dark"]}`}
      style={{ maxHeight: 400 }}
    >
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeigth} />
    </div>
  );
}
