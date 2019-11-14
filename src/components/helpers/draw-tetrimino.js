import { INVISIBLE_ROWS } from "../../utils/consts";
import { getShapeColor } from "../../utils";
import drawBlock from "./draw-block";

export default function drawTetrimino({
  block,
  ctx,
  side,
  startingRow = INVISIBLE_ROWS,
  offset = [0, 0]
}) {
  if (!block) return;
  const { shape, position, locked } = block;
  const [x, y] = position;
  const startColor = getShapeColor(shape);
  let color = startColor;

  shape.forEach((row, ri) =>
    row.forEach((col, ci) => {
      if (!col) return;
      const position = [
        x * side + ci * side + offset[0],
        y * side + (ri - startingRow) * side + offset[1]
      ];
      drawBlock({ ctx, side, position, color, locked });
    })
  );
}
