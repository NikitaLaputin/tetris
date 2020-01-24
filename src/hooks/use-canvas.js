import React, { useRef, useEffect } from "react";
import { PIXEL_RATIO } from "../utils/consts";

export default function useCanvas(style, clearArea) {
  const { width, height, side } = style;
  const canvasWidth = width * PIXEL_RATIO;
  const canvasHeigth = height * PIXEL_RATIO;
  const ref = useRef(null);
  const canvasEl = ref.current;
  const ctx = canvasEl && canvasEl.getContext("2d");

  useEffect(() => {
    if (!ctx) return;
    if (side) {
      console.log("CLEARING");
      clearArea.forEach((row, rowI) =>
        row.forEach((cell, cellI) => {
          if (cell) ctx.clearRect(rowI, cellI, side, side);
        })
      );
    } else {
      ctx.clearRect(0, 0, canvasWidth, canvasHeigth);
      console.log("CLEARING");
    }
  }, [clearArea]);

  const canvas = (
    <canvas ref={ref} width={canvasWidth} height={canvasHeigth} style={style} />
  );

  return {
    canvas,
    ctx
  };
}
