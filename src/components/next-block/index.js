import React, { memo, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { nextBlockSelector } from '../../redux/selectors';
import drawTetrimino from '../helpers/draw-tetrimino';
import styles from '../field/field.module.css';
import useCanvas from '../../hooks/use-canvas';
import { PIXEL_RATIO, BLOCK_SIDE } from '../../utils/consts';
import { clearArea } from '../../utils';

const NextBlock = () => {
  const nextBlock = useSelector(state => nextBlockSelector(state));
  const width = 100;
  const height = 100;

  const { shape } = useMemo(() => nextBlock, [nextBlock]);
  const x = useMemo(
    () => Math.floor((width * PIXEL_RATIO - shape[0].length * BLOCK_SIDE) / 2),
    [shape]
  );
  const y = useMemo(
    () => Math.floor((height * PIXEL_RATIO - shape.length * BLOCK_SIDE) / 2),
    [shape]
  );
  const startPosition = useMemo(() => [x / BLOCK_SIDE, y / BLOCK_SIDE], [x, y]);

  const canvas = useCanvas(
    useCallback(
      ctx => {
        const position = [0, 0];
        const block = { ...nextBlock, position };
        const offset = [x, y];
        drawTetrimino({
          block,
          ctx,
          side: BLOCK_SIDE,
          offset,
          startingRow: 0
        });
        clearArea(ctx, shape, startPosition);
      },
      [nextBlock, shape, startPosition, x, y]
    ),
    { width, height }
  );

  return (
    <div
      className={`${styles['canvas-container']} ${styles['canvas-container__dark']}`}
    >
      <div className={styles.text}>Next block</div>
      {canvas}
    </div>
  );
};

export default memo(NextBlock);
