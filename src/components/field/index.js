/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from "react";
import useDrawBlock from "../block";
import { shapes } from "../../utils/consts";
import { useSelector, useDispatch } from "react-redux";
import { blockSelector } from "../../redux/selectors";
import useKey from "../../hooks/use-key-press";
import { moveRight, moveLeft } from "../../redux/ducks/active-block";

const calcHeight = (side, shape) => {
  switch (shape) {
    default:
      return 4 * side;
  }
};

export default function Field() {
  const speed = 1;
  const canvasWidth = 200;
  const canvasHeigth = 400;
  const side = 20;
  const [coords, setCoords] = useState([
    { x: 0, y: 0, shape: shapes[0], active: true }
  ]);
  const pushCoords = newCoords =>
    setCoords(oldCoords => oldCoords.concat(newCoords));
  const canvasRef = useRef(null);
  const block = useSelector(state => blockSelector(state));
  const dispatch = useDispatch();
  const right = () => dispatch(moveRight());
  const left = () => dispatch(moveLeft());
  useDrawBlock({
    block,
    canvasHeigth,
    canvasWidth,
    canvasRef,
    side
  });
  const rightArrow = useKey("ArrowRight");
  const leftArrow = useKey("ArrowLeft");
  useEffect(() => {
    if (rightArrow) right();
    if (leftArrow) left();
  }, [rightArrow, leftArrow]);
  const onClick = e => {
    pushCoords({ x: e.clientX, y: e.clientY, shape: shapes[0], active: true });
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

// const addBlock = () =>
//   pushCoords({ x: 0, y: 0, shape: shapes[0], active: true });
// const update = () => {
//   requestAnimationFrame(function animate() {
//     setCoords(old =>
//       old.map(old => {
//         if (old.active && old.y + calcHeight(side, old.shape) < canvasHeigth)
//           return { ...old, y: old.y + speed };
//         addBlock();
//         return { ...old, y: canvasHeigth - calcHeight(side, old.shape) };
//       })
//     );
//     requestAnimationFrame(animate);
//   });
// };
