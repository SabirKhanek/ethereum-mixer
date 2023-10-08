export function getTimeAgo(date: Date) {
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - date.getTime();

  const minutesAgo = Math.floor(timeDifference / (1000 * 60));
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);
  const weeksAgo = Math.floor(daysAgo / 7);
  const monthsAgo = Math.floor(daysAgo / 30);

  if (monthsAgo >= 1) {
    return `${monthsAgo} ${monthsAgo === 1 ? "month" : "months"} ago`;
  } else if (weeksAgo >= 1) {
    return `${weeksAgo} ${weeksAgo === 1 ? "week" : "weeks"} ago`;
  } else if (daysAgo >= 1) {
    return `${daysAgo} ${daysAgo === 1 ? "day" : "days"} ago`;
  } else if (hoursAgo >= 1) {
    return `${hoursAgo} ${hoursAgo === 1 ? "hour" : "hours"} ago`;
  } else if (minutesAgo >= 1) {
    return `${minutesAgo} ${minutesAgo === 1 ? "minute" : "minutes"} ago`;
  } else {
    return "just now";
  }
}
