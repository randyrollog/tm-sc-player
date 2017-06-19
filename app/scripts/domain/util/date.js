'use strict';

var date;

export default date = {
  getFormattedDate(d) {
    let date = new Date(d);
    let mm = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    let dd = date.getDay() < 10 ? `0${date.getDay() + 1}` : date.getDay() + 1;
    let yy = date.getFullYear();

    return `${mm}/${dd}/${yy}`;
  },

  // Using momentjs for brevity sake
  getRelativeTime(d) {
    return `${moment(d).fromNow()}`;
  }
}