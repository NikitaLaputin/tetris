import { colors, BLOCK_SIDE } from "../../utils/consts";
import drawBlock from "./draw-block";

export default function drawField({ field, ctx }) {
  field.forEach((row, ri) => {
    row.forEach((col, ci) => {
      if (!col) return;
      const position = [ci * BLOCK_SIDE, ri * BLOCK_SIDE];
      const color = colors[field[ri][ci]];
      drawBlock({ ctx, BLOCK_SIDE, position, color });
    });
  });
}
