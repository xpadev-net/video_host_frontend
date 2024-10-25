const time2str = (time: number): string => {
  time = Math.floor(time);
  const sec = `00${(time % 60) % 60}`.slice(-2);
  const min = `00${Math.floor(time / 60) % 60}`.slice(-2);
  const hour = Math.floor(time / 3600);

  if (hour > 0) {
    return `${hour}:${min}:${sec}`;
  }
  return `${min}:${sec}`;
};

export { time2str };
