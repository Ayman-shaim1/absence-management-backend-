function generateRandomDate(startDate, endDate) {
  const minValue = startDate.getTime();
  const maxValue = endDate.getTime();
  const timestamp = Math.floor(
    Math.random() * (maxValue - minValue + 1) + minValue
  );
  const datestring = new Date(timestamp)
    .toLocaleDateString()
    .split("/")
    .reverse();
  console.log(datestring);
  return datestring;
}

export default generateRandomDate;
