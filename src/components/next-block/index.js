import React, { memo, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";

import { nextBlockSelector } from "../../redux/selectors";
import drawTetrimino from "../helpers/draw-tetrimino";
import useCanvas from "../../hooks/use-canvas";
import { PIXEL_RATIO, BLOCK_SIDE } from "../../utils/consts";
import { clearArea } from "../../utils";

import styles from "../field/field.module.css";

const NextBlock = () => {
  const nextBlock = useSelector(state => nextBlockSelector(state));
  const width = 100;
  const height = 100;

  const { shape } = useMemo(() => nextBlock, [nextBlock]);
  const x = useMemo(
    () =>
      Math.floor(
        ((width * PIXEL_RATIO - shape[0].length * BLOCK_SIDE) /
          (2 * BLOCK_SIDE)) *
          10
      ) / 10,
    [shape]
  );
  const y = useMemo(
    () =>
      Math.floor(
        ((height * PIXEL_RATIO - shape.length * BLOCK_SIDE) /
          (2 * BLOCK_SIDE)) *
          10
      ) / 10,
    [shape]
  );

  const position = useMemo(() => [x, y], [x, y]);

  const canvas = useCanvas(
    useCallback(
      ctx => {
        const block = { shape, position };
        drawTetrimino({
          block,
          ctx,
          startingRow: 0
        });
      },
      [shape, position]
    ),
    { width, height },
    useCallback(
      ctx => {
        clearArea(ctx, shape, position);
      },
      [position, shape]
    )
  );

  return (
    <div
      className={`${styles["canvas-container"]} ${styles["canvas-container__dark"]}`}
    >
      <div className={styles.text}>Next block</div>
      {canvas}
    </div>
  );
};

export default memo(NextBlock);
