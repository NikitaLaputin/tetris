import React, { useEffect, memo } from "react";
import { useSelector } from "react-redux";
import { nextBlockSelector } from "../../redux/selectors";
import drawTetrimino from "../helpers/draw-tetrimino";
import styles from "../field/field.module.css";
import useCanvas from "../../hooks/use-canvas";

function NextBlock() {
  const nextBlock = useSelector(state => nextBlockSelector(state));
  const width = 100;
  const height = 100;

  const dependencies = [nextBlock];
  const { canvas, ctx, ratio } = useCanvas({ width, height }, dependencies);
  useEffect(() => {
    if (ctx) {
      const { shape } = nextBlock;
      const side = 20 * ratio;
      const x = Math.floor((width * ratio - shape[0].length * side) / 2);
      const y = Math.floor((height * ratio - shape.length * side) / 2);
      const position = [0, 0];
      const block = { ...nextBlock, position };
      const offset = [x, y];
      drawTetrimino({
        block,
        ctx,
        side,
        ratio,
        offset,
        startingRow: 0
      });
    }
  }, [nextBlock, ctx, ratio]);

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
