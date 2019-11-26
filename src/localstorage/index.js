export const loadHighScore = () => {
  try {
    const serializedHighScore = localStorage.getItem("highScore");
    if (serializedHighScore === null) {
      return [0, 0, 0, 0, 0];
    }
    return JSON.parse(serializedHighScore);
  } catch (err) {
    return [0, 0, 0, 0, 0];
  }
};

export const saveHighScore = score => {
  const serializedHighScore = JSON.stringify(score);
  localStorage.setItem("highScore", serializedHighScore);
};
