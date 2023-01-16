function generateRandomDate(startDate, endDate) {
  const minValue = startDate.getTime();
  const maxValue = endDate.getTime();
  const timestamp = Math.floor(
    Math.random() * (maxValue - minValue + 1) + minValue
  );
  return new Date(timestamp);
}

export default generateRandomDate;
