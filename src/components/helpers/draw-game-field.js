import drawField from "./draw-field";
import drawTetrimino from "./draw-tetrimino";

export default function drawGameField({ field, ctx, side, block, ghostBlock }) {
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
}
