import React, { useRef, useEffect } from "react";
import { PIXEL_RATIO } from "../utils/consts";

export default function useCanvas({ width, height }, deps) {
  const canvasWidth = width * PIXEL_RATIO;
  const canvasHeigth = height * PIXEL_RATIO;
  const ref = useRef(null);
  const canvasEl = ref.current;
  const ctx = canvasEl && canvasEl.getContext("2d");

  useEffect(() => {
    if (ctx) ctx.clearRect(0, 0, canvasWidth, canvasHeigth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps]);

  const canvas = (
    <canvas
      ref={ref}
      width={canvasWidth}
      height={canvasHeigth}
      style={{
        width: canvasWidth / PIXEL_RATIO,
        height: canvasHeigth / PIXEL_RATIO
      }}
    />
  );

  return {
    canvas,
    ctx,
    ratio: PIXEL_RATIO
  };
}
