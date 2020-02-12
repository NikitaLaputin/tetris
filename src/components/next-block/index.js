import React, { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { nextBlockSelector, gameStatusSelector } from '../../redux/selectors';
import drawTetrimino from '../helpers/draw-tetrimino';
import useCanvas from '../../hooks/use-canvas';
import { PIXEL_RATIO, BLOCK_SIDE, NOT_STARTED } from '../../utils/consts';
import { clearArea } from '../../utils';

import styles from '../field/field.module.css';

const NextBlock = () => {
  const width = 100;
  const height = 100;
  const nextBlock = useSelector(state =>
    nextBlockSelector(
      state,
      width * PIXEL_RATIO,
      height * PIXEL_RATIO,
      BLOCK_SIDE
    )
  );
  const status = useSelector(state => gameStatusSelector(state));

  const canvas = useCanvas(
    useCallback(
      ctx => {
        if (status !== NOT_STARTED) {
          drawTetrimino({
            block: nextBlock,
            ctx,
            startingRow: 0
          });
        }
      },
      [nextBlock, status]
    ),
    { width, height },
    useCallback(
      ctx => {
        clearArea(ctx, nextBlock.shape, nextBlock.position);
      },
      [nextBlock.position, nextBlock.shape]
    )
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
