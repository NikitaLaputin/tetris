import { colors, BLOCK_SIDE } from '../../utils/consts';
import drawBlock from './draw-block';
import { lightenColor } from '../../utils';

export default function drawField({ field, ctx }) {
  field.forEach((row, ri) => {
    row.forEach((col, ci) => {
      if (!col) return;

      const position = [ci * BLOCK_SIDE, ri * BLOCK_SIDE];
      const color =
        col > colors.length ? lightenColor(colors[col - 8], 75) : colors[col];
      const ghost = !color;

      drawBlock({ ctx, BLOCK_SIDE, position, color, ghost });
    });
  });
}
