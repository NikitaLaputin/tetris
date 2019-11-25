/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

export default function useKey(
  targetKey,
  callback,
  continious = false,
  frequency = 100
) {
  const [pressed, setPressed] = useState(false);

  const onDown = e => {
    e.preventDefault();
    const { key } = e;
    if (key.toLowerCase() === targetKey.toLowerCase()) {
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
    const interval = setInterval(() => {
      if (pressed && continious) {
        callback();
      }
    }, frequency);
    return () => clearInterval(interval);
  }, [pressed, continious]);

  return pressed;
}
