import React, { memo, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import {
  blockSelector,
  fieldSelector,
  gameStateSelector,
  ghostBlockSelector,
  highScoreSelector,
  scoreSelector
} from '../../redux/selectors';
import {
  NOT_STARTED,
  INVISIBLE_ROWS,
  GAME_PAUSED,
  GAME_OVER,
  BLOCK_SIDE,
  PIXEL_RATIO
} from '../../utils/consts';
import drawText from '../helpers/draw-text';
import useCanvas from '../../hooks/use-canvas';
import drawHighScore from '../helpers/draw-high-score';
import drawGameOver from '../helpers/draw-game-over';
import drawField from '../helpers/draw-field';
import drawTetrimino from '../helpers/draw-tetrimino';
import styles from './field.module.css';
import { clearArea, getDifference } from '../../utils';
import usePrevious from '../helpers/use-previous';

const Field = () => {
  const block = useSelector(state => blockSelector(state));
  const field = useSelector(state => fieldSelector(state));
  const ghostBlock = useSelector(state => ghostBlockSelector(state));
  const { status } = useSelector(state => gameStateSelector(state));
  const highScore = useSelector(state => highScoreSelector(state));
  const score = useSelector(state => scoreSelector(state));

  const canvasStyle = useMemo(
    () => ({
      width: 200,
      height: 400,
      position: 'absolute',
      borderRadius: 10
    }),
    []
  );

  const blockShape = useMemo(() => block.shape, [block.shape]);

  const ghostBlockShape = useMemo(() => ghostBlock.shape, [ghostBlock]);

  const prevBlockShape = usePrevious(blockShape);

  const prevGhostBlockShape = usePrevious(ghostBlockShape);

  const blockPosition = useMemo(
    () => [block.position[0], block.position[1] - INVISIBLE_ROWS],
    [block.position]
  );

  const ghostBlockPosition = useMemo(
    () => [ghostBlock.position[0], ghostBlock.position[1] - INVISIBLE_ROWS],
    [ghostBlock]
  );

  const prevBlockPosition = usePrevious(blockPosition);

  const prevGhostBlockPosition = usePrevious(ghostBlockPosition);

  const {
    renderArea: blockRenderArea,
    clearArea: blockClearArea
  } = useMemo(
    () =>
      getDifference(
        blockShape,
        blockPosition,
        prevBlockShape,
        prevBlockPosition
      ),
    [blockPosition, blockShape, prevBlockPosition, prevBlockShape]
  );

  const blockToRender = useMemo(
    () => ({
      shape: blockRenderArea,
      position: block.position,
      locked: block.locked
    }),
    [block.locked, block.position, blockRenderArea]
  );

  const fieldPosition = useMemo(() => [0, 0 - INVISIBLE_ROWS], []);

  const fieldCanvas = useCanvas(
    useCallback(
      ctx => {
        drawField({
          field,
          ctx
        });
      },
      [field]
    ),
    useCallback(
      ctx => {
        clearArea(ctx, field, fieldPosition);
      },
      [field, fieldPosition]
    ),
    canvasStyle
  );

  const blockCanvas = useCanvas(
    useCallback(
      ctx => {
        drawTetrimino({
          block: blockToRender,
          ctx
        });
      },
      [blockToRender]
    ),
    useCallback(
      ctx => {
        clearArea(ctx, blockClearArea, blockPosition);
      },
      [blockClearArea, blockPosition]
    ),
    { ...canvasStyle, zIndex: 2 }
  );

  const ghostBlockCanvas = useCanvas(
    useCallback(
      ctx => {
        drawTetrimino({
          block: ghostBlock,
          ctx,
          ghost: true
        });
      },
      [ghostBlock]
    ),
    useCallback(
      ctx => {
        clearArea(ctx, ghostBlockShape, ghostBlockPosition);
      },
      [ghostBlockShape, ghostBlockPosition]
    ),
    canvasStyle
  );

  const textCanvas = useCanvas(
    useCallback(
      ctx => {
        const color = '#eaeaea';
        const position = [
          (field[0].length * BLOCK_SIDE) / 2,
          ((field.length - INVISIBLE_ROWS - 5) / 2) * BLOCK_SIDE
        ];
        const center = [
          (field[0].length * BLOCK_SIDE) / 2,
          ((field.length - INVISIBLE_ROWS) / 2) * BLOCK_SIDE
        ];
        switch (status) {
          case NOT_STARTED:
            drawHighScore({
              highScore,
              ctx,
              size: 20,
              position,
              color
            });
            break;

          case GAME_PAUSED:
            drawText({
              ctx,
              size: 30,
              position: center,
              color,
              text: 'PAUSED'
            });
            break;

          case GAME_OVER:
            drawGameOver({
              ctx,
              highScore: highScore.includes(score),
              position,
              color
            });
            break;

          default:
            return;
        }
      },
      [field, highScore, score, status]
    ),
    useCallback(
      ctx => {
        ctx.clearRect(
          0,
          0,
          canvasStyle.width * PIXEL_RATIO,
          canvasStyle.height * PIXEL_RATIO
        );
      },
      [canvasStyle.height, canvasStyle.width]
    ),
    {
      ...canvasStyle,
      background:
        (status === NOT_STARTED || status === GAME_PAUSED) &&
        'var(--bg-color-d)',
      zIndex: 3
    }
  );

  return (
    <div
      className={`${styles['canvas-container']} ${styles['canvas-container__dark']}`}
      style={{ height: 400 }}
    >
      {textCanvas}
      {blockCanvas}
      {ghostBlockCanvas}
      {fieldCanvas}
    </div>
  );
};

export default memo(Field);
