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
  const darkColor = darkenColor(color, 25);
  const lightColor = lightenColor(color, 50);
  lingrad.addColorStop(0, locked ? lightColor : color);
  lingrad.addColorStop(0.5, locked ? lightColor : color);
  lingrad.addColorStop(0.5, locked ? color : darkColor);
  lingrad.addColorStop(1, locked ? color : darkColor);
  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.lineJoin = "round";
  ctx.fillStyle = lingrad;
  ctx.fillRect(x, y, side, side);
  ctx.closePath();
}
