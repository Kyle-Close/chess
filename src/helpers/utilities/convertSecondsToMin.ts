export function convertSecondsToMin(seconds: number) {
  const minutesSegment = Math.floor(seconds / 60);
  const secondsSegment = formatLeadingZero(seconds % 60);

  return `${minutesSegment}:${secondsSegment}`;
}

function formatLeadingZero(num: number) {
  if (Number(num) >= 0 && Number(num) <= 9) return '0' + num;
  return num;
}
