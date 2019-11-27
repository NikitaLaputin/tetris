import drawGameField from "./draw-game-field";
import drawText from "./draw-text";

export default function drawGameOver({
  ctx,
  side,
  ratio,
  block,
  ghostBlock,
  color,
  position,
  score,
  highScore,
  field
}) {
  drawGameField({
    ctx,
    side,
    ratio,
    block,
    ghostBlock,
    field
  });
  drawText({
    ratio,
    ctx,
    size: 30,
    position,
    color,
    text: "GAME OVER"
  });
  if (highScore.includes(score)) {
    drawText({
      ratio,
      ctx,
      size: 30,
      position: [position[0], position[1] + 40 * ratio],
      color,
      text: "NEW HIGH SCORE!"
    });
  }
}
