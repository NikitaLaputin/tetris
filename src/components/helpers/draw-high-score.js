import drawText from "./draw-text";

export default function drawHighScore({
  highScore = [],
  ctx,
  color,
  position,
  ratio,
  size
}) {
  drawText({
    ratio,
    ctx,
    size: 30,
    position,
    color,
    text: "PRESS START"
  });
  const highScores = highScore.reduce(
    (res, val, i) =>
      val
        ? res.concat(
            drawText({
              ctx,
              size,
              position: [position[0], position[1] + 30 * ratio * (i + 2)],
              color,
              text: `${i + 1}: ${val}`,
              ratio
            })
          )
        : res,
    []
  );
  if (highScores.length) {
    drawText({
      ctx,
      size: 20,
      position: [position[0], position[1] + 30 * ratio],
      color,
      text: "HIGH SCORES:",
      ratio
    });
  }
}
