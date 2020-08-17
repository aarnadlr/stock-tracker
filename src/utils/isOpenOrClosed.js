// define our open / closing times
const startTime = '9:30 AM';
const endTime = '4:00 PM';

// get now
const now = new Date();


// Assign opening and closing times to 'now' date objects
function dateObjWithAssignedTime(d) {

  // split string by 'colon' and 'space' into an array of strings:
  // ["9", "30", "AM"]
  let parts = d.split(/:|\s/);

  let date  = new Date();
  
  // Convert to military time (0 to 24 o'clock) if pm
  // pluck the last string and check if PM
  if (parts.pop().toLowerCase() === 'pm') {
    // If pm, take the hour and add 12 to make it military time
    // 16    =          4 + 12
    parts[0] = (+parts[0]) + 12;
  }

  // ["9", "30", "AM"]
  // pluck/remove first string (hours) and set the hour
  date.setHours(+parts.shift());

  // ["30", "AM"]
  // pluck/remove first string (now minutes) and set the minutes
  date.setMinutes(+parts.shift());

  // date object now has the time we assigned for opening/closing
  // ie 'Sun Aug 16 2020 09:30 GMT-0400 (Eastern Daylight Time)'
  return date;
}


// call func to get date object with opening time
let openingDateTime = dateObjWithAssignedTime(startTime);
// call func to get date object with closing time
let closingDateTime = dateObjWithAssignedTime(endTime);


// compute today's day of the week. Check whether its a weekday or not
function isWeekday() {
  const dayOfWeek = now.getDay();
  // Sunday - Saturday : 0 - 6
  // if btw 1 to 5
  if (dayOfWeek >= 1 && dayOfWeek < 6) {
    return true;
  } else {
    return false;
  }
}


// expression returns string to render
export const openOrClosed =
  // if now is later than opening time
  (now > openingDateTime) &&
  // and is earlier than closing time, 
  (now < closingDateTime)
  // and its a weekday,
  && isWeekday()
  // its open.
  ? 'open' : 'closed';
