import {Base64} from 'js-base64';
import {Dimensions} from 'react-native';

export const base64 = char => {
  return Base64.encode(char);
};

export const formatDate = date => {
  const formattedDate = new Date(date);
  return `${('0' + formattedDate.getDate()).slice(
    -2,
  )}/${formattedDate.getMonth() + 1}/${formattedDate.getFullYear()}`;
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

const isWeekend = date => {
  const d = new Date(date);
  return d.getDay() === 5 || d.getDay() === 6;
};

// get array of dates between 2 dates excluding weekends
export const getDatesExcludingWeekEnds = (startDate, endDate) => {
  let dates = [];

  let currentDate = startDate;

  while (currentDate <= endDate) {
    if (!isWeekend(currentDate)) {
      dates.push(new Date(currentDate));
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

function isPositiveNumber(n) {
  return Number(n) === n && Number(n) > 0;
}

export const groupByProperty = (arrayOfObjects, property) => {
  return arrayOfObjects.reduce((acc, obj) => {
    let key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
};

export const groupByPropertyOfProperty = (
  arrayOfObjects,
  parentPpty,
  childPpty,
) => {
  return arrayOfObjects.reduce((acc, obj) => {
    let objPpty = obj[parentPpty];
    let key = objPpty[childPpty];
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

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const fullFormatDate = date => {
  const dayName = days[new Date(date).getDay()];
  const day = ('0' + new Date(date).getDate()).slice(-2);
  const monthIndex = new Date(date).getMonth();
  const year = new Date(date).getFullYear();
  return `${dayName} ${day} ${months[monthIndex]} ${year}`;
};

export const screenWidth = Math.round(Dimensions.get('window').width);
export {getDates, isPositiveNumber};
