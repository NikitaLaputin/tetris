/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

export default function useDrawTetramino({ block, canvasRef, side }) {
  useEffect(() => {
    if (!block) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { position, shape } = block;
    const [x, y] = position;
    shape.forEach((row, ri) =>
      row.forEach((col, ci) => {
        if (!col) return;
        ctx.beginPath();
        ctx.fillStyle = "#FF0000";
        ctx.rect(x * side + ci * side, y * side + ri * side, side, side);
        ctx.fill();
        ctx.closePath();
      })
    );
  }, [block]);
}
