/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { isMobileDevice } from "../utils";

export default function useKey({
  targetKey,
  callback,
  continious = false,
  frequency = 100,
  targetButton = false
}) {
  let delay = 200;
  let interval, timeout;
  const [pressed, setPressed] = useState(false);
  const mouseUp = isMobileDevice ? "touchend" : "mouseup";
  const mouseDown = isMobileDevice ? "touchstart" : "mousedown";

  const onDown = e => {
    const { key } = e;
    if (targetKey && key && key.toLowerCase() === targetKey.toLowerCase()) {
      e.preventDefault();
      setPressed(true);
    } else if (
      targetButton &&
      e.type === mouseDown &&
      targetButton.current.contains(e.target)
    ) {
      setPressed(true);
    }
  };
  const onUp = e => {
    const { key } = e;
    if (targetKey && key && key.toLowerCase() === targetKey.toLowerCase()) {
      setPressed(false);
    } else if (
      targetButton &&
      e.type === mouseUp &&
      targetButton.current.contains(e.target)
    ) {
      setPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    if (targetButton) {
      window.addEventListener(mouseDown, onDown);
      window.addEventListener(mouseUp, onUp);
    }
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keydup", onUp);
      if (targetButton) {
        window.addEventListener(mouseDown, onDown);
        window.addEventListener(mouseUp, onUp);
      }
    };
  }, [targetKey]);

  useEffect(() => {
    if (!callback) return;
    if (pressed) callback();
    if (continious) {
      timeout = setTimeout(
        () =>
          (interval = setInterval(() => {
            if (pressed && continious) {
              callback();
            }
          }, frequency)),
        delay
      );
    }
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [pressed, continious, delay]);

  return pressed;
}
