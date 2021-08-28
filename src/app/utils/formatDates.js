export function toDateString(ms) {
  const date = new Date(ms).toDateString().slice(4);
  const time = new Date(ms).toLocaleTimeString().replace(/:\d\d /g, " ");
  return `${date}, ${time}`;
}

export function toTimeString(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms / 1000) % 60);
  const timeString = `${minutes}:${seconds}`;
  const formattedTimeString = timeString.replace(/\b([0-9])\b/g, "0$1");

  return formattedTimeString;
}
