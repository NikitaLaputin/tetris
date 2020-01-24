import React, { useEffect, useState, memo, useRef } from "react";
import { useSelector } from "react-redux";
import {
  blockSelector,
  fieldSelector,
  gameStateSelector,
  ghostBlockSelector,
  highScoreSelector,
  scoreSelector
} from "../../redux/selectors";
import styles from "./field.module.css";
import {
  NOT_STARTED,
  INVISIBLE_ROWS,
  GAME_PAUSED,
  GAME_OVER
} from "../../utils/consts";
import drawText from "../helpers/draw-text";
import useCanvas from "../../hooks/use-canvas";
import drawHighScore from "../helpers/draw-high-score";
import drawGameField from "../helpers/draw-game-field";
import drawGameOver from "../helpers/draw-game-over";
import drawField from "../helpers/draw-field";
import drawTetrimino from "../helpers/draw-tetrimino";
import { PIXEL_RATIO } from "../../utils/consts";
import { mergeMatrix } from "../../utils";

const Field = () => {
  const { block, field, ghostBlock, gameState, highScore, score } = useSelector(
    state => ({
      block: blockSelector(state),
      field: fieldSelector(state),
      ghostBlock: ghostBlockSelector(state),
      gameState: gameStateSelector(state),
      highScore: highScoreSelector(state),
      score: scoreSelector(state)
    })
  );

  const emptyArr = useRef(null);
  emptyArr.current = [[]];

  const [prevField, setPrevField] = useState(field);
  const [prevBlock, setPrevBlock] = useState(block);

  const { status } = gameState;

  const canvasStyle = {
    width: 200,
    height: 400,
    position: "absolute",
    borderRadius: 10
  };

  const { canvas, ctx } = useCanvas(canvasStyle, prevField);
  const { canvas: blockCanvas, ctx: blockCtx } = useCanvas(
    canvasStyle,
    prevBlock
  );
  const { canvas: textCanvas, ctx: textCtx } = useCanvas(
    {
      ...canvasStyle,
      zIndex: 2
    },
    emptyArr.current
  );

  useEffect(() => {
    setPrevField(field);
  }, [field]);

  useEffect(() => {
    setPrevBlock(block);
  }, [block]);

  useEffect(() => {
    if (!ctx || !textCtx) return;
    const side = 20 * PIXEL_RATIO;
    const color = "#eaeaea";
    const position = [
      (field[0].length * side) / 2,
      ((field.length - INVISIBLE_ROWS - 5) / 2) * side
    ];
    const center = [
      (field[0].length * side) / 2,
      ((field.length - INVISIBLE_ROWS) / 2) * side
    ];
    switch (status) {
      case NOT_STARTED:
        drawHighScore({
          highScore,
          ctx: textCtx,
          size: 20,
          position,
          color
        });
        break;
      case GAME_PAUSED:
        drawText({
          ctx: textCtx,
          size: 30,
          position: center,
          color,
          text: "PAUSED"
        });
        break;
      case GAME_OVER:
        drawGameOver({
          ctx: textCtx,
          side,
          block,
          ghostBlock,
          highScore: highScore.includes(score),
          position,
          field,
          color
        });
        break;
      default:
        drawField({ field, ctx, side });
        drawTetrimino({
          block: ghostBlock,
          ctx: blockCtx,
          side,
          ghost: true
        });
        drawTetrimino({
          block,
          ctx: blockCtx,
          side
        });
    }
  }, [
    block,
    field,
    status,
    highScore,
    ctx,
    ghostBlock,
    score,
    textCtx,
    blockCtx
  ]);

  return (
    <div
      className={`${styles["canvas-container"]} ${styles["canvas-container__dark"]}`}
      style={{ height: 400 }}
    >
      {textCanvas}
      {blockCanvas}
      {canvas}
    </div>
  );
};

export default memo(Field);
