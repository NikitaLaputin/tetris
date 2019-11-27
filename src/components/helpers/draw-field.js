import { colors, INVISIBLE_ROWS } from "../../utils/consts";
import drawBlock from "./draw-block";

export default function drawField({ field, ctx, side, ratio }) {
  field.forEach((row, ri) => {
    if (ri > INVISIBLE_ROWS - 1)
      row.forEach((col, ci) => {
        if (!col) return;
        const position = [ci * side, (ri - INVISIBLE_ROWS) * side];
        const color = colors[field[ri][ci]];
        drawBlock({ ctx, side, position, color, ratio });
      });
  });
}
