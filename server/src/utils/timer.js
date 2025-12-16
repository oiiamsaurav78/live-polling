let timer = null;

export const startPollTimer = (duration, onEnd) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    onEnd();
  }, duration * 1000);
};

export const clearPollTimer = () => {
  clearTimeout(timer);
};
