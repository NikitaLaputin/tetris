import React, { useEffect, memo } from "react";
import { useSelector } from "react-redux";
import { nextBlockSelector } from "../../redux/selectors";
import drawTetrimino from "../helpers/draw-tetrimino";
import styles from "../field/field.module.css";
import useCanvas from "../../hooks/use-canvas";
import { PIXEL_RATIO } from "../../utils/consts";

function NextBlock() {
  const nextBlock = useSelector(state => nextBlockSelector(state));
  const width = 100;
  const height = 100;

  const dependencies = [nextBlock];
  const { canvas, ctx } = useCanvas({ width, height }, dependencies);
  useEffect(() => {
    if (ctx) {
      const { shape } = nextBlock;
      const side = 20 * PIXEL_RATIO;
      const x = Math.floor((width * PIXEL_RATIO - shape[0].length * side) / 2);
      const y = Math.floor((height * PIXEL_RATIO - shape.length * side) / 2);
      const position = [0, 0];
      const block = { ...nextBlock, position };
      const offset = [x, y];
      drawTetrimino({
        block,
        ctx,
        side,
        offset,
        startingRow: 0
      });
    }
  }, [nextBlock, ctx]);

  return (
    <div
      className={`${styles["canvas-container"]} ${styles["canvas-container__dark"]}`}
    >
      <div className={styles.text}>Next block</div>
      {canvas}
    </div>
  );
}
export default memo(NextBlock);
