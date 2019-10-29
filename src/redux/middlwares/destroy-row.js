import { MERGE, destroyRow } from "../ducks/field";

export default store => next => action => {
  const { type } = action;
  switch (type) {
    case MERGE:
      next(action);
      return next(destroyRow());
    default:
      return next(action);
  }
};
