const startTime = '9:30 AM';
const endTime   = '4:30 PM';
const now       = new Date();

// get date objects
let startDate = dateObj(startTime); 
let endDate   = dateObj(endTime);

// parse date
function dateObj(d) {         
  let parts = d.split(/:|\s/),
        date  = new Date();
    if (parts.pop().toLowerCase() === 'pm') parts[0] = (+parts[0]) + 12;
    date.setHours(+parts.shift());
    date.setMinutes(+parts.shift());
    return date;
}

function isWeekday() {
  const dayOfWeek = now.getDay();

  if(dayOfWeek >= 1 && dayOfWeek < 6){
    return true
  }else{
    return false
  }
}

// comparison
export const openOrClosed = (now < endDate) && (now > startDate) && isWeekday() ? 'open' : 'closed';