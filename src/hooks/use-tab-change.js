import { useEffect } from "react";

export default function useTabChange(callback) {
  useEffect(() => {
    document.addEventListener("visibilitychange", callback);
    return () => {
      document.removeEventListener("visibilitychange", callback);
    };
  }, [callback]);
}
