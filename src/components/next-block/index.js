import React, { useRef, useEffect, memo } from "react";
import { useSelector } from "react-redux";
import { nextBlockSelector } from "../../redux/selectors";
import drawBlock from "../helpers/draw-tetrimino";
import styles from "../field/field.module.css";
import { PIXEL_RATIO } from "../../utils/consts";

function NextBlock() {
  const nextBlock = useSelector(state => nextBlockSelector(state));
  const { shape } = nextBlock;
  const side = 20 * PIXEL_RATIO;
  const canvasWidth = 100 * PIXEL_RATIO;
  const canvasHeigth = 100 * PIXEL_RATIO;
  const x = Math.floor((canvasWidth - shape[0].length * side) / 2);
  const y = Math.floor((canvasHeigth - shape.length * side) / 2);
  const offset = [x, y];
  const position = [0, 0];
  const block = { ...nextBlock, position };
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvasWidth, canvasHeigth);
    drawBlock({ block, ctx, side, startingRow: 0, offset });
  }, [block, offset, canvasWidth, canvasHeigth, side]);

  return (
    <div
      className={`${styles["canvas-container"]} ${styles["canvas-container__dark"]}`}
    >
      <div className={styles.text}>Next block</div>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeigth}
        style={{
          width: canvasWidth / PIXEL_RATIO,
          height: canvasHeigth / PIXEL_RATIO
        }}
      />
    </div>
  );
}
export default memo(NextBlock);
