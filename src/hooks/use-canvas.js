import React, { useRef, useEffect, useMemo } from "react";
import { PIXEL_RATIO } from "../utils/consts";

const useCoolCanvas = (draw, clearFunction, style) => {
  const { width, height } = style;
  const canvasWidth = useMemo(() => width * PIXEL_RATIO, [width]);
  const canvasHeigth = useMemo(() => height * PIXEL_RATIO, [height]);
  const ref = useRef(null);
  const ctx = ref.current && ref.current.getContext("2d");

  useEffect(() => {
    if (!ctx) return;

    draw(ctx);

    return () => {
      clearFunction(ctx);
    };
  }, [draw, clearFunction, ctx]);

  const canvas = (
    <canvas ref={ref} width={canvasWidth} height={canvasHeigth} style={style} />
  );

  return canvas;
};

export default useCoolCanvas;
