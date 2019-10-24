import { useState, useEffect } from "react";

export default function useKey(targetKey) {
  const [pressed, setPressed] = useState(false);

  const onDown = ({ key }) => {
    if (key === targetKey) setPressed(true);
  };

  const onUp = ({ key }) => {
    if (key === targetKey) setPressed(false);
  };

  // Bind and unbind events
  useEffect(() => {
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, [targetKey]);

  return pressed;
}
