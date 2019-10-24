/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

export default function useKey(targetKey, callback) {
  const onDown = ({ key }) => {
    if (key === targetKey) callback();
  };
  useEffect(() => {
    window.addEventListener("keydown", onDown);
    return () => {
      window.removeEventListener("keydown", onDown);
    };
  }, [targetKey]);

  return;
}
