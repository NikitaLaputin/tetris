import React, { useRef, useEffect, useMemo } from "react";
import { PIXEL_RATIO } from "../utils/consts";

const useCoolCanvas = (draw, style, cleanup) => {
  const { width, height } = style;
  const canvasWidth = useMemo(() => width * PIXEL_RATIO, [width]);
  const canvasHeigth = useMemo(() => height * PIXEL_RATIO, [height]);
  const ref = useRef(null);

  useEffect(() => {
    const ctx = ref.current && ref.current.getContext("2d");

    if (!ctx) return;

    window.requestAnimationFrame(() => draw(ctx));

    return () => cleanup && window.requestAnimationFrame(() => cleanup(ctx));
  }, [draw, cleanup]);

  const canvas = (
    <canvas ref={ref} width={canvasWidth} height={canvasHeigth} style={style} />
  );

  return canvas;
};

export default useCoolCanvas;
