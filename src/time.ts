export function relativeTime(date: Date): string {
  if (isNaN(date.getTime())) return "Invalid date";

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const isFuture = seconds < 0;
  const absSeconds = Math.abs(seconds);

  const intervals: Record<string, number> = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };

  for (const [unit, value] of Object.entries(intervals)) {
    const count = Math.floor(absSeconds / value);
    if (count >= 1) {
      return isFuture
        ? `in ${count} ${unit}${count > 1 ? "s" : ""}`
        : `${count} ${unit}${count > 1 ? "s" : ""} ago`;
    }
  }

  return isFuture ? "in a few seconds" : "just now";
}
