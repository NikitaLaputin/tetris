import { useState, useEffect, useRef, useCallback } from "react";

const now = () => new Date().getTime();

export default function useInterval(callback, ms) {
  const [remaining, setRemaining] = useState(0);
  const [startTime, setStartTime] = useState(now());
  const [paused, setPaused] = useState(true);
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const start = useCallback(() => {
    setStartTime(now());
    setPaused(false);
  }, []);

  const pause = useCallback(() => {
    setPaused(true);
    setRemaining(ms - (now() - startTime));
    setStartTime(now());
  }, [ms, startTime]);

  const resume = useCallback(() => {
    if (paused) {
      setPaused(false);
      setStartTime(now());
    }
  }, [paused]);

  const reset = useCallback(() => {
    setPaused(false);
    setRemaining(ms);
    setStartTime(now());
  }, [ms]);

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
