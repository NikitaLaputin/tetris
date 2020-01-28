import { darkenColor, lightenColor } from '../../utils';
import { PIXEL_RATIO, BLOCK_SIDE, INVISIBLE_ROWS } from '../../utils/consts';

export default function drawBlock({
  ctx,
  position,
  color,
  locked = false,
  ghost = false
}) {
  const [x, y] = position;

  // if (y - INVISIBLE_ROWS < 0) return;

  if (ghost) {
    ctx.beginPath();
    ctx.strokeStyle = '#858fa5';
    ctx.lineWidth = 2 * PIXEL_RATIO;
    ctx.rect(
      x + 2 * PIXEL_RATIO,
      y + 2 * PIXEL_RATIO,
      BLOCK_SIDE - 4 * PIXEL_RATIO,
      BLOCK_SIDE - 4 * PIXEL_RATIO
    );
    ctx.stroke();
    ctx.closePath();
  } else {
    const lingrad = ctx.createLinearGradient(
      x,
      y,
      x + BLOCK_SIDE,
      y + BLOCK_SIDE
    );
    const colorGradStart = locked ? lightenColor(color, 75) : color;
    const colorGradEnd = locked
      ? lightenColor(color, 25)
      : darkenColor(color, 35);
    lingrad.addColorStop(0, colorGradStart);
    lingrad.addColorStop(0.5, colorGradStart);
    lingrad.addColorStop(0.5, colorGradEnd);
    lingrad.addColorStop(1, colorGradEnd);
    ctx.fillStyle = lingrad;
    ctx.fillRect(
      x + 1 * PIXEL_RATIO,
      y + 1 * PIXEL_RATIO,
      BLOCK_SIDE - 2 * PIXEL_RATIO,
      BLOCK_SIDE - 2 * PIXEL_RATIO
    );
  }
}
