/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

export default function useKey(
  targetKey,
  callback,
  continious = false,
  frequency = 100
) {
  let delay = 200;
  let interval, timeout;
  const [pressed, setPressed] = useState(false);

  const onDown = e => {
    const { key } = e;
    if (key.toLowerCase() === targetKey.toLowerCase()) {
      e.preventDefault();
      setPressed(true);
    }
  };
  const onUp = ({ key }) => {
    if (key.toLowerCase() === targetKey.toLowerCase()) {
      setPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keydup", onUp);
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
