let currentDate = (new Date()).toISOString().slice(0, 10);

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  };
  
const getDuration = (Date, EndDate) => {
    let End = EndDate === 'Running' ? currentDate : EndDate;
    let year = End.slice(0, 4) - Date.slice(0, 4);
    let months = End.slice(5, 7) - Date.slice(5, 7);
    let days = End.slice(8, 10) - Date.slice(8, 10);
    if (Math.sign(months) === -1) {
      let totalMonths = 12 + months
      let string = `${totalMonths}` + ' months ' + `${days}` + ' days '
      if (Math.sign(days) === -1) {
        let daysInMonth1 = +daysInMonth(+Date.slice(5, 7), Date.slice(0, 4)) - (+Date.slice(8, 10))
        days = +End.slice(8, 10) + daysInMonth1
        string = `${totalMonths - 1}` + ' months ' + `${days}` + ' days'
        if (year - 1 > 0) {
          string = `${year - 1}` + ' year ' + `${totalMonths}` + ' months ' + `${days}` + ' days'
        }
        return string
      }
      if (year - 1 > 0) {
        string = `${year - 1}` + ' year ' + `${totalMonths}` + ' months ' + `${days}` + ' days'
      }
      return string
    } else {
      let string = `${months}` + ' months ' + `${days}` + ' days '
      if (Math.sign(days) === -1) {
        let daysInMonth1 = +daysInMonth(+Date.slice(5, 7), Date.slice(0, 4)) - (+Date.slice(8, 10))
        days = +End.slice(8, 10) + daysInMonth1
        string = `${months - 1}` + ' months ' + `${days}` + ' days'
        if (year - 1 > 0) {
          string = `${year - 1}` + ' year ' + `${months - 1}` + ' months ' + `${days}` + ' days'
        }
        return string
      }
      if (year > 0) {
        string = `${year}` + ' year ' + `${months}` + ' months ' + `${days}` + ' days '
      }
      return string
    }
  };

export default getDuration;