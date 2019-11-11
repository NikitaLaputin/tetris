import { colors, INVISIBLE_ROWS } from "../../utils/consts";

export default function drawField({ field, ctx, side }) {
  field.forEach((row, ri) => {
    if (ri > INVISIBLE_ROWS - 1)
      row.forEach((col, ci) => {
        if (!col) return;
        ctx.beginPath();
        ctx.fillStyle = colors[field[ri][ci]];
        ctx.rect(ci * side, (ri - INVISIBLE_ROWS) * side, side, side);
        ctx.fill();
        ctx.closePath();
      });
  });
}
