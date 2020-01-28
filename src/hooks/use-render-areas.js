import { useMemo } from 'react';
import usePrevious from '../components/helpers/use-previous';
import { getDifference } from '../utils';

const useRenderAreas = (area, position) => {
  const prevArea = usePrevious(area);
  const prevPosition = usePrevious(position);

  const { renderArea, clearArea } = useMemo(
    () => getDifference(area, position, prevArea, prevPosition),
    [area, position, prevArea, prevPosition]
  );

  return {
    renderArea,
    clearArea,
    prevPosition
  };
};

export default useRenderAreas;
