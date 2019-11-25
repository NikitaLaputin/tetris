import { darkenColor, lightenColor } from "../../utils";

export default function drawBlock({
  ctx,
  side,
  position,
  color,
  locked = false,
  ghost = false
}) {
  const [x, y] = position;
  if (ghost) {
    ctx.beginPath();
    ctx.strokeStyle = "#858fa5";
    ctx.lineWidth = 2;
    ctx.rect(x + 2, y + 2, side - 4, side - 4);
    ctx.stroke();
    ctx.closePath();
  } else {
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
    ctx.fillStyle = lingrad;
    ctx.fillRect(x + 1, y + 1, side - 2, side - 2);
    ctx.closePath();
  }
}
