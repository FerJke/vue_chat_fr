import { format, isToday, differenceInDays } from 'date-fns';

function passedTime(time) {
  const date = new Date(time);
  const today = new Date();
  const diff = differenceInDays(today, date);
  let res = '';

  if (isToday(date)) {
    res = `Today: ${format(date, 'HH:mm')}`;
  } else {
    res = `${diff} days ago`;
  }

  return res;
}

export default passedTime;
