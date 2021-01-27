function sortByTime(a, b) {
  const timestampA = new Date(`${a.date} ${a.time}`);
  const timestampB = new Date(`${b.date} ${b.time}`);
  return timestampA - timestampB;
}

export default sortByTime;
