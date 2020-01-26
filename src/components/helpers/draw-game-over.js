import drawText from "./draw-text";
import { PIXEL_RATIO } from "../../utils/consts";

export default function drawGameOver({
  ctx,
  color,
  position,
  highScore = false
}) {
  if (highScore) {
    drawText({
      ctx,
      size: 30,
      position,
      color,
      text: "GAME OVER"
    });
    drawText({
      ctx,
      size: 30,
      position: [position[0], position[1] + 40 * PIXEL_RATIO],
      color,
      text: "NEW"
    });
    drawText({
      ctx,
      size: 30,
      position: [position[0], position[1] + 80 * PIXEL_RATIO],
      color,
      text: "HIGH SCORE!"
    });
  } else {
    drawText({
      ctx,
      size: 30,
      position: [position[0], position[1] + 60 * PIXEL_RATIO],
      color,
      text: "GAME OVER"
    });
  }
}
