export default function drawText({
  ctx,
  size,
  position,
  color,
  text,
  ratio = 1
}) {
  const [x, y] = position;
  ctx.textAlign = "center";
  ctx.lineWidth = 3 * ratio;
  ctx.font = `${size * ratio}px monospace`;
  ctx.strikeStyle = "black";
  ctx.strokeText(text, x, y, 190 * ratio);
  ctx.fillStyle = color;
  ctx.fillText(text, x, y, 190 * ratio);
}
