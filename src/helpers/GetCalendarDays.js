// returns available days in specific month
const getCalendarDays = (year, month) => {
  const date = new Date(year, month - 1, 1);
  const result = [];
  while (date.getMonth() === month - 1) {
    let day = date.getDate()
    result.push(day);
    date.setDate(date.getDate() + 1);
  }
  return result;
}

export default getCalendarDays
