/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from "react";
import { isMobileDevice } from "../utils";

const mouseUp = isMobileDevice ? "touchend" : "mouseup";
const mouseDown = isMobileDevice ? "touchstart" : "mousedown";

const isKeyClicked = (targetKey, key) =>
  targetKey && key && key.toLowerCase() === targetKey.toLowerCase();

const isButtonClicked = (targetButton, e, type) =>
  targetButton && e.type === type && targetButton.current.contains(e.target);

export default function useKey({
  targetKey,
  callback,
  continious = false,
  targetButton = false,
  frequency = 100,
  delay = 200
}) {
  const [pressed, setPressed] = useState(false);

  const onDown = useCallback(
    e => {
      const { key } = e;
      if (
        isKeyClicked(targetKey, key) ||
        isButtonClicked(targetButton, e, mouseDown)
      ) {
        e.preventDefault();
        setPressed(true);
      }
    },
    [targetKey]
  );

  const onUp = useCallback(
    e => {
      const { key } = e;
      if (
        isKeyClicked(targetKey, key) ||
        isButtonClicked(targetButton, e, mouseUp)
      ) {
        e.preventDefault();
        setPressed(false);
      }
    },
    [targetKey]
  );

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
    let interval, timeout;

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
