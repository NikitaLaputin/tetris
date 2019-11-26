import { PIXEL_RATIO } from "../../utils/consts";

export default function drawText({ ctx, size, position, color, text }) {
  const [x, y] = position;
  ctx.textAlign = "center";
  ctx.lineWidth = 3 * PIXEL_RATIO;
  ctx.font = `${size * PIXEL_RATIO}px monospace`;
  ctx.strikeStyle = "black";
  ctx.strokeText(text, x, y, 190 * PIXEL_RATIO);
  ctx.fillStyle = color;
  ctx.fillText(text, x, y, 190 * PIXEL_RATIO);
}
