import React, { memo, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import {
  highScoreSelector,
  scoreSelector,
  activeFieldSelector,
  gameStatusSelector
} from '../../redux/selectors';
import {
  NOT_STARTED,
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
import { clearArea } from '../../utils';
import useRenderAreas from '../../hooks/use-render-areas';

import styles from './field.module.css';

const Field = () => {
  const field = useSelector(state => activeFieldSelector(state));
  const status = useSelector(state => gameStatusSelector(state));
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

  const {
    renderArea: fieldRenderArea,
    clearArea: fieldClearArea
  } = useRenderAreas(field);

  const fieldCanvas = useCanvas(
    useCallback(
      ctx => {
        clearArea(ctx, fieldClearArea);
        drawField({
          field: fieldRenderArea,
          ctx
        });
      },
      [fieldClearArea, fieldRenderArea]
    ),
    canvasStyle
  );

  const textCanvas = useCanvas(
    useCallback(
      ctx => {
        const color = '#eaeaea';
        const position = [
          (field[0].length * BLOCK_SIDE) / 2,
          ((field.length - 5) / 2) * BLOCK_SIDE
        ];
        const center = [
          (field[0].length * BLOCK_SIDE) / 2,
          (field.length / 2) * BLOCK_SIDE
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
      {fieldCanvas}
    </div>
  );
};

export default memo(Field);
