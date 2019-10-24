/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

export default function useDrawBall({
  coords,
  canvasRef,
  canvasWidth,
  canvasHeigth,
  radius
}) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvasWidth, canvasHeigth);
    coords.forEach(coord => {
      const { x, y } = coord;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = "#FF0000";
      ctx.fill();
      ctx.closePath();
    });
  }, [coords]);
}
