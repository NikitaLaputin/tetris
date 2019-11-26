export const NEW_HIGH_SCORE = "NEW_HIGH_SCORE";

export default (state = [0, 0, 0, 0, 0], action) => {
  const { type, payload } = action;
  switch (type) {
    case NEW_HIGH_SCORE:
      console.log("SCORES", payload);
      return state
        .concat(payload)
        .sort((a, b) => b - a)
        .slice(0, 5);
    default:
      return state;
  }
};

export const setNewHighScore = payload => ({
  type: NEW_HIGH_SCORE,
  payload
});
