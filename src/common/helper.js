import {Base64} from 'js-base64';

export const base64 = char => {
  return Base64.encode(char);
};

export const formatDate = date => {
  const formattedDate = new Date(date);
  return `${formattedDate.getDate()}/${formattedDate.getMonth() +
    1}/${formattedDate.getFullYear()}`;
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

function isPositiveNumber(n) {
  return Number(n) === n && Number(n) > 0;
}

export const groupBy = (arrayOfObjects, property) => {
  return arrayOfObjects.reduce((acc, obj) => {
    let key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
};

/** Format date, from new Date() to `06 Oct 2019` */

const months = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
};

export const fullFormatDate = date => {
  const day = new Date(date).getDate();
  const monthIndex = new Date(date).getMonth();
  const year = new Date(date).getFullYear();
  return `${day} ${months[monthIndex]} ${year}`;
};
export {getDates, isPositiveNumber};
