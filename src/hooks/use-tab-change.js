import { useEffect } from "react";

const useTabChange = callback => {
  useEffect(() => {
    document.addEventListener("visibilitychange", callback);
    return () => {
      document.removeEventListener("visibilitychange", callback);
    };
  }, [callback]);
};

export default useTabChange;
