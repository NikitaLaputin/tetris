/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { colors, INVISIBLE_ROWS } from "../utils/consts";

export default function useDrawField({ field, canvasRef, side, refresh }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    field.forEach((row, ri) =>
      ri > INVISIBLE_ROWS - 1
        ? row.forEach((col, ci) => {
            if (!col) return;
            ctx.beginPath();
            ctx.fillStyle = colors[field[ri][ci]];
            ctx.rect(ci * side, (ri - INVISIBLE_ROWS) * side, side, side);
            ctx.fill();
            ctx.closePath();
          })
        : null
    );
  }, [field, refresh]);
}
