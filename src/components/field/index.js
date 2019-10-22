import React, { useRef, useState, useEffect } from "react";
import useDrawBall from "../ball";

export default function Field() {
  const canvasWidth = 480;
  const canvasHeigth = 320;
  const radius = 10;
  const [coords, setCoords] = useState([{ x: 0, y: 0 }]);
  const pushCoords = newCoords =>
    setCoords(oldCoords => oldCoords.concat(newCoords));
  const canvasRef = useRef(null);
  useDrawBall({
    coords,
    canvasHeigth,
    canvasWidth,
    canvasRef,
    radius
  });
  useEffect(() => {
    const interval = setInterval(
      () =>
        setCoords(old =>
          old.map(old =>
            old.y + radius < canvasHeigth ? { ...old, y: old.y + 1 } : old
          )
        ),
      10
    );
    return () => {
      clearInterval(interval);
    };
  }, []);
  const onClick = e => {
    pushCoords({ x: e.clientX, y: e.clientY });
  };
  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeigth}
      onClick={onClick}
    ></canvas>
  );
}
