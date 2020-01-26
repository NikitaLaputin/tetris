import drawField from "./draw-field";
import drawTetrimino from "./draw-tetrimino";

export default function drawGameField({ field, ctx, side, block, ghostBlock }) {
  drawField({ field, ctx, side });
  drawTetrimino({
    block: ghostBlock,
    ctx,
    ghost: true
  });
  drawTetrimino({
    block,
    ctx
  });
}
