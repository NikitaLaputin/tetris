/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

export default function useKey(targetKey, callback, shouldTrack = true) {
  const onDown = ({ key }) => {
    if (key === targetKey) callback();
  };
  useEffect(() => {
    if (!shouldTrack) return;
    window.addEventListener("keydown", onDown);
    return () => {
      window.removeEventListener("keydown", onDown);
    };
  }, [targetKey, shouldTrack]);

  return;
}
