/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

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

  const onDown = e => {
    const { key } = e;
    if (targetKey && key && key.toLowerCase() === targetKey.toLowerCase()) {
      e.preventDefault();
      setPressed(true);
    } else if (
      targetButton &&
      e.type === "mousedown" &&
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
      e.type === "mouseup" &&
      targetButton.current.contains(e.target)
    ) {
      setPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    if (targetButton) {
      window.addEventListener("mousedown", onDown);
      window.addEventListener("mouseup", onUp);
    }
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keydup", onUp);
      if (targetButton) {
        window.addEventListener("mousedown", onDown);
        window.addEventListener("mouseup", onUp);
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
