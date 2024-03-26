function copyFormatted(formattedText) {
 // const formattedText = 'This is a <b>bold</b> and <u>underlined</u> test.';
  const blob = new Blob([formattedText], {type: 'text/html'});
  const clipboardItem = new window.ClipboardItem({ 'text/html': blob });
  navigator.clipboard.write([clipboardItem]);
}

function parseDateString(s) {
  var b = s.split(/\D/g);
  return new Date(b[0], --b[1], b[2], b[3], b[4], b[5], 0);
}

// Format time as hh:mm AM/PM
function formatHHMM(date) {
  function z(n) {
    return (n < 10 ? '0' : '') + n;
  }
  var h = date.getHours();
  return z(h % 12 || 12) + ':' + z(date.getMinutes()) + ' ' + (h < 12 ? 'AM' : 'PM');
}

function currentTime(){
//	return(formatHHMM(parseDateString(Date.now())));
	var x = Date().toLocaleString();
 var month = x.slice(4,7);
 var day = parseInt(x.slice(8,10));
 
	return(x.slice(16,21));
}

function currentDate(){
 var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
return(today);
}

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function daysFromToday(days) {
 return(formatDate(addDays(Date(),days)));
}

function formatDate(date) {
  var dayOfWeek = ['Sun','Mon','Tues','Wed','Thurs','Fri','Sat'];
  var weekday = dayOfWeek[date.getDay()];
  var dd = String(date.getDate()); //.padStart(2, '0');
  var mm = String(date.getMonth() + 1); //.padStart(2, '0'); //January is 0!
  return(weekday + ", " + mm + '/' + dd);
}
