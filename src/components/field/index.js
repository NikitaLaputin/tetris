/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from "react";
import useDrawBlock from "../../hooks/use-draw-tetramino";
import { useSelector, useDispatch } from "react-redux";
import { blockSelector } from "../../redux/selectors";
import useKey from "../../hooks/use-key-press";
import { moveRight, moveLeft, moveDown } from "../../redux/ducks/active-block";

export default function Field() {
  const canvasWidth = 200;
  const canvasHeigth = 400;
  const speed = 1000;
  const side = 20;
  const canvasRef = useRef(null);
  const block = useSelector(state => blockSelector(state));
  const dispatch = useDispatch();
  const right = () => dispatch(moveRight());
  const left = () => dispatch(moveLeft());
  const down = () => dispatch(moveDown());
  useDrawBlock({
    block,
    canvasHeigth,
    canvasWidth,
    canvasRef,
    side
  });
  useKey("ArrowRight", right);
  useKey("ArrowLeft", left);
  useKey("ArrowDown", down);
  useEffect(() => {
    const intervalId = setInterval(() => down(), speed);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <canvas ref={canvasRef} width={canvasWidth} height={canvasHeigth}></canvas>
  );
}
