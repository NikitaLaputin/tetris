import { useMemo } from "react";
import usePrevious from "../components/helpers/use-previous";
import { getDifference } from "../utils";

const useRenderAreas = area => {
  const prevArea = usePrevious(area);

  const { renderArea, clearArea } = useMemo(
    () => getDifference(area, prevArea),
    [area, prevArea]
  );

  return {
    renderArea,
    clearArea
  };
};

export default useRenderAreas;
