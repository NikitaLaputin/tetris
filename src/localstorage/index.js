export const loadHighScore = () => {
  try {
    const serializedHighScore = localStorage.getItem("highScore");
    if (serializedHighScore === null) {
      return undefined;
    }
    return JSON.parse(serializedHighScore);
  } catch (err) {
    return undefined;
  }
};

export const saveHighScore = state => {
  const serializedHighScore = JSON.stringify(state);
  localStorage.setItem("highScore", serializedHighScore);
};
