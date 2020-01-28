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
import { clearArea } from '../../utils';
import useRenderAreas from '../../hooks/use-render-areas';

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

  const blockPosition = useMemo(
    () => [block.position[0], block.position[1] - INVISIBLE_ROWS],
    [block]
  );

  const {
    renderArea: blockRenderArea,
    clearArea: blockClearArea,
    prevPosition: prevBlockPosition
  } = useRenderAreas(block.shape, blockPosition);

  const blockToRender = useMemo(
    () => ({
      shape: blockRenderArea,
      position: block.position,
      locked: block.locked
    }),
    [block.locked, block.position, blockRenderArea]
  );

  const ghostBlockPosition = useMemo(
    () => [ghostBlock.position[0], ghostBlock.position[1] - INVISIBLE_ROWS],
    [ghostBlock]
  );

  const {
    renderArea: ghostBlockRenderArea,
    clearArea: ghostBlockClearArea,
    prevPosition: prevGhostBlockPosition
  } = useRenderAreas(ghostBlock.shape, ghostBlockPosition);

  const ghostBlockToRender = useMemo(
    () => ({
      shape: ghostBlockRenderArea,
      position: ghostBlock.position,
      locked: ghostBlock.locked
    }),
    [ghostBlock.locked, ghostBlock.position, ghostBlockRenderArea]
  );

  const fieldPosition = useMemo(() => [0, 0 - INVISIBLE_ROWS], []);

  const {
    renderArea: fieldRenderArea,
    clearArea: fieldClearArea
  } = useRenderAreas(field, fieldPosition);

  const fieldCanvas = useCanvas(
    useCallback(
      ctx => {
        drawField({
          field: fieldRenderArea,
          ctx
        });
        clearArea(ctx, fieldClearArea);
        console.log('FIELD:', fieldRenderArea);
        console.log('FIELD CLEAR:', fieldClearArea);
      },
      [fieldClearArea, fieldRenderArea]
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
        clearArea(ctx, blockClearArea, prevBlockPosition);
      },
      [blockClearArea, prevBlockPosition, blockToRender]
    ),
    { ...canvasStyle, zIndex: 2 }
  );

  const ghostBlockCanvas = useCanvas(
    useCallback(
      ctx => {
        drawTetrimino({
          block: ghostBlockToRender,
          ctx,
          ghost: true
        });
        clearArea(ctx, ghostBlockClearArea, prevGhostBlockPosition);
      },
      [ghostBlockClearArea, ghostBlockToRender, prevGhostBlockPosition]
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
    {
      ...canvasStyle,
      background:
        (status === NOT_STARTED || status === GAME_PAUSED) &&
        'var(--bg-color-d)',
      zIndex: 3
    },
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
    )
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
