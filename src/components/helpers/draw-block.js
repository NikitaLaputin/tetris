import { darkenColor, lightenColor } from "../../utils";

export default function drawBlock({
  ctx,
  side,
  position,
  color,
  locked = false
}) {
  const [x, y] = position;
  const lingrad = ctx.createLinearGradient(x, y, x + side, y + side);
  const colorGradStart = locked ? lightenColor(color, 75) : color;
  const colorGradEnd = locked
    ? lightenColor(color, 25)
    : darkenColor(color, 35);
  lingrad.addColorStop(0, colorGradStart);
  lingrad.addColorStop(0.5, colorGradStart);
  lingrad.addColorStop(0.5, colorGradEnd);
  lingrad.addColorStop(1, colorGradEnd);
  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.lineJoin = "round";
  ctx.fillStyle = lingrad;
  ctx.fillRect(x, y, side, side);
  ctx.closePath();
}
