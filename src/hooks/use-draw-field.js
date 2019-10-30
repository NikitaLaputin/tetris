/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { colors } from "../utils/consts";

export default function useDrawField({ field, canvasRef, side, refresh }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    field.forEach((row, ri) =>
      row.forEach((col, ci) => {
        if (!col) return;
        ctx.beginPath();
        ctx.fillStyle = colors[field[ri][ci]];
        ctx.rect(ci * side, ri * side, side, side);
        ctx.fill();
        ctx.closePath();
      })
    );
  }, [field, refresh]);
}
