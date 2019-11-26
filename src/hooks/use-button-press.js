/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

export default function useButtonPress(
  ref,
  callback,
  continious = false,
  frequency = 100
) {
  let delay = 200;
  let interval, timeout;
  const [pressed, setPressed] = useState(false);

  const onDown = ({ target }) => {
    if (target === ref.current) {
      setPressed(true);
    }
  };
  const onUp = ({ target }) => {
    if (target === ref.current) {
      setPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousedup", onUp);
    };
  }, [ref]);

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
