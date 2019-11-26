export default function drawText({ ctx, size, position, color, text }) {
  const [x, y] = position;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.font = `${size}px monospace`;
  ctx.fillText(text, x, y, 190);
}
