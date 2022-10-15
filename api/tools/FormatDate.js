// Converts a numerical date into a readable date
// 2022-9-1 = September. 9, 2022
module.exports.format = function (date) {
  const Calendar = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  let yearMonthDay = date.split(":")[0];
  yearMonthDay = yearMonthDay.split("-");
  let day = yearMonthDay[2];
  let month = Calendar[yearMonthDay[1]];
  let year = yearMonthDay[0];

  return `${month}. ${day}, ${year}`;
};
