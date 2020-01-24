import drawText from "./draw-text";
import { PIXEL_RATIO } from "../../utils/consts";

export default function drawHighScore({
  highScore = [],
  ctx,
  color,
  position,
  size
}) {
  const highScores = highScore.reduce(
    (res, val, i) =>
      val
        ? res.concat(
            drawText({
              ctx,
              size,
              position: [position[0], position[1] + 30 * PIXEL_RATIO * (i + 2)],
              color,
              text: `${i + 1}: ${val}`
            })
          )
        : res,
    []
  );
  if (highScores.length) {
    drawText({
      ctx,
      size: 30,
      position,
      color,
      text: "PRESS START"
    });
    drawText({
      ctx,
      size: 20,
      position: [position[0], position[1] + 30 * PIXEL_RATIO],
      color,
      text: "HIGH SCORES:"
    });
  } else {
    drawText({
      ctx,
      size: 30,
      position: [position[0], position[1] + 50 * PIXEL_RATIO],
      color,
      text: "PRESS START"
    });
  }
}
