import drawField from "./draw-field";
import drawTetrimino from "./draw-tetrimino";

export default function drawGameField({
  field,
  ctx,
  side,
  ratio,
  block,
  ghostBlock
}) {
  drawField({ field, ctx, side, ratio });
  drawTetrimino({
    ratio,
    block: ghostBlock,
    ctx,
    side,
    ghost: true
  });
  drawTetrimino({
    ratio,
    block,
    ctx,
    side
  });
}
