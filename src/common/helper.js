export const base64 = (char) => {
  return window.btoa(char);
};

export const formatDate = (date) => {
  const formattedDate = new Date(date);
  return `${formattedDate.getDate()}/${
    formattedDate.getMonth() + 1
  }/${formattedDate.getFullYear()}`;
};

// get array of dates between 2 dates
function getDates(startDate, endDate) {
  let dates = [];

  let currentDate = startDate;

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

export { getDates };
