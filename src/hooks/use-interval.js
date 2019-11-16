import { useState, useEffect, useRef } from "react";

const now = () => new Date().getTime();

export default function useInterval(callback, ms) {
  const [remaining, setRemaining] = useState(0);
  const [startTime, setStartTime] = useState(now());
  const [paused, setPaused] = useState(true);
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const start = () => {
    setStartTime(now());
    setPaused(false);
  };
  const pause = () => {
    setPaused(true);
    setRemaining(ms - (now() - startTime));
    setStartTime(now());
  };
  const resume = () => {
    if (paused) {
      setPaused(false);
      setStartTime(now());
    }
  };
  const reset = () => {
    setPaused(false);
    setRemaining(0);
    setStartTime(0);
  };

  useEffect(() => {
    const interval = setInterval(
      () => {
        savedCallback.current();
        setRemaining(0);
        setStartTime(now());
      },
      remaining ? remaining : ms
    );
    if (paused) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [ms, paused, remaining]);

  return {
    start,
    pause,
    resume,
    reset
  };
}
