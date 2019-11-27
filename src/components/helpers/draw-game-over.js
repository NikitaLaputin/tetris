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
  highScore = false,
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
  if (highScore) {
    drawText({
      ratio,
      ctx,
      size: 30,
      position,
      color,
      text: "GAME OVER"
    });
    drawText({
      ratio,
      ctx,
      size: 30,
      position: [position[0], position[1] + 40 * ratio],
      color,
      text: "NEW"
    });
    drawText({
      ratio,
      ctx,
      size: 30,
      position: [position[0], position[1] + 80 * ratio],
      color,
      text: "HIGH SCORE!"
    });
  } else {
    drawText({
      ratio,
      ctx,
      size: 30,
      position: [position[0], position[1] + 60 * ratio],
      color,
      text: "GAME OVER"
    });
  }
}
