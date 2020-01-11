/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
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
  let interval, timeout;
  const [pressed, setPressed] = useState(false);

  const onDown = e => {
    const { key } = e;
    if (
      isKeyClicked(targetKey, key) ||
      isButtonClicked(targetButton, e, mouseDown)
    ) {
      e.preventDefault();
      setPressed(true);
    }
  };
  const onUp = e => {
    const { key } = e;
    if (
      isKeyClicked(targetKey, key) ||
      isButtonClicked(targetButton, e, mouseUp)
    ) {
      e.preventDefault();
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
