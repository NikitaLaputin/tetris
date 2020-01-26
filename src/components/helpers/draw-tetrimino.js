import { INVISIBLE_ROWS, BLOCK_SIDE } from "../../utils/consts";
import { getShapeColor } from "../../utils";
import drawBlock from "./draw-block";

export default function drawTetrimino({
  block,
  ctx,
  startingRow = INVISIBLE_ROWS,
  offset = [0, 0],
  ghost = false
}) {
  if (!block) return;
  const { shape, position, locked } = block;
  const [x, y] = position;
  let color = getShapeColor(shape);

  shape.forEach((row, ri) =>
    row.forEach((col, ci) => {
      if (!col) return;
      const position = [
        x * BLOCK_SIDE + ci * BLOCK_SIDE + offset[0],
        y * BLOCK_SIDE + (ri - startingRow) * BLOCK_SIDE + offset[1]
      ];
      drawBlock({ ctx, position, color, locked, ghost });
    })
  );
}
