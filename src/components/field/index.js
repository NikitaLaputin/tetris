import React, { useEffect } from "react";
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

export default function Field() {
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
  const { status } = gameState;
  const dependencies = [block, field, status];
  const { canvas, ctx, ratio } = useCanvas(
    { width: 200, height: 400 },
    dependencies
  );

  useEffect(() => {
    if (ctx) {
      const side = 20 * ratio;
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
            ctx,
            size: 20,
            position,
            color,
            ratio
          });
          break;
        case GAME_PAUSED:
          drawText({
            ratio,
            ctx,
            size: 30,
            position: center,
            color,
            text: "PAUSED"
          });
          break;
        case GAME_OVER:
          drawGameOver({
            ctx,
            side,
            ratio,
            block,
            ghostBlock,
            score,
            highScore,
            position,
            field,
            color
          });
          break;
        default:
          drawGameField({
            ctx,
            side,
            ratio,
            field,
            block,
            ghostBlock
          });
      }
    }
  }, [block, field, status, highScore, ctx, ratio, ghostBlock, score]);

  return (
    <div
      className={`${styles["canvas-container"]} ${styles["canvas-container__dark"]}`}
      style={{ maxHeight: 400 }}
    >
      {canvas}
    </div>
  );
}
