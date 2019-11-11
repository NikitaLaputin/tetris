/* eslint-disable react-hooks/exhaustive-deps */
import { colors, INVISIBLE_ROWS } from "../../utils/consts";

export default function drawTetrimino({
  block,
  ctx,
  side,
  startingRow = INVISIBLE_ROWS,
  offset = [0, 0]
}) {
  if (!block) return;
  const { position, shape, locked } = block;
  const [x, y] = position;
  shape.forEach((row, ri) =>
    row.forEach((col, ci) => {
      if (!col) return;
      ctx.beginPath();
      ctx.fillStyle = locked ? "#000" : colors[shape[ri][ci]];
      ctx.rect(
        x * side + ci * side + offset[0],
        y * side + (ri - startingRow) * side + offset[1],
        side,
        side
      );
      ctx.fill();
      ctx.closePath();
    })
  );
}
