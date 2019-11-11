/* eslint-disable react-hooks/exhaustive-deps */
import { colors, INVISIBLE_ROWS } from "../../utils/consts";

export default function drawTetramino({ block, canvasRef, side }) {
  if (!block) return;
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  const { position, shape, locked } = block;
  const [x, y] = position;
  shape.forEach((row, ri) =>
    row.forEach((col, ci) => {
      if (!col) return;
      ctx.beginPath();
      ctx.fillStyle = locked ? "#000" : colors[shape[ri][ci]];
      ctx.rect(
        x * side + ci * side,
        y * side + (ri - INVISIBLE_ROWS) * side,
        side,
        side
      );
      ctx.fill();
      ctx.closePath();
    })
  );
}
