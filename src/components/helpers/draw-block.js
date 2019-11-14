import { LOCK_DELAY } from "../../utils/consts";

let startTime = -1;
let animationLength = 100;
let animId;

export default function drawBlock({
  ctx,
  side,
  position,
  color,
  locked = false
}) {
  const [x, y] = position;
  const maxOpacity = 1;
  const minOpacity = 0.3;
  const curve = side / 4;

  const animate = (timestamp, rect) => {
    let progress = 0,
      opacity = maxOpacity;

    if (startTime < 0) {
      startTime = timestamp;
    } else {
      progress = timestamp - startTime;
    }

    if (progress < LOCK_DELAY) {
      opacity =
        Math.floor(
          (maxOpacity - ((maxOpacity - minOpacity) * progress) / LOCK_DELAY) *
            100
        ) / 100;
      color = color
        .split(", ")
        .map((val, i, arr) => (i < arr.length - 1 ? val : `${opacity})`))
        .join(", ");
      ctx.clearRect(...rect);
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.fillRect(...rect);
      ctx.closePath();
      // console.log("OPACITY", opacity, color);
      requestAnimationFrame(timestamp => animate(timestamp, rect));
    }
  };

  const rect = [x, y, side, side];
  // if (locked) {
  //   startTime = -1;
  //   console.log("STARTING ANIMATION");
  //   animId = requestAnimationFrame(timestamp => animate(timestamp, rect));
  //   setTimeout(() => cancelAnimationFrame(animId), LOCK_DELAY);
  // }
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.moveTo(x, y);
  ctx.lineTo(x + side, y);
  ctx.lineTo(x + side, y + side);
  ctx.lineTo(x, y + side);
  ctx.fill();
  ctx.closePath();
}
