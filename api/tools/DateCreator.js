// Creates a new current date
// yy-mm-dd:hr:min:sec
module.exports.create = function () {
  const date = new Date();
  let year = date.getUTCFullYear().toString();
  let month = (date.getUTCMonth() + 1).toString();
  let day = date.getUTCDate().toString();
  let hour = date.getHours().toString();
  let minute = date.getMinutes().toString();
  let second = date.getSeconds().toString();

  let newDate = `${year}-${month}-${day}:${hour}:${minute}:${second}`;
  return newDate;
};
