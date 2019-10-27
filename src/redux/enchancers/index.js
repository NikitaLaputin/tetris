import { UNDO } from "../../utils/consts";

export const undoable = reducer => {
  const initialState = {
    past: [],
    present: reducer(undefined, {})
  };

  return (state = initialState, action) => {
    const { past, present } = state;
    const { type } = action;
    switch (type) {
      case UNDO:
        const previous = past[past.length - 1];
        const newPast = past.slice(0, past.length - 1);
        return {
          past: newPast,
          present: previous
        };
      default:
        const newPresent = reducer(present, action);
        if (present === newPresent) {
          return state;
        }
        return {
          past: [...past, present],
          present: newPresent
        };
    }
  };
};
