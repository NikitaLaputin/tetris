/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

export default function useDrawField({ field, canvasRef, side, refresh }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    field.forEach((row, ri) =>
      row.forEach((col, ci) => {
        if (!col) return;
        ctx.beginPath();
        ctx.fillStyle = "#FF0000";
        ctx.rect(ci * side, ri * side, side, side);
        ctx.fill();
        ctx.closePath();
      })
    );
  }, [field, refresh]);
}
