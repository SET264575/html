function getRadioButtonValue(name){
  var ele = document.getElementsByName(name);
  for (let i = 0; i < ele.length; i++){
    if (ele[i].checked){
      return(ele[i].value);
    }
  }
  return(false);
}

function getValue(id) {
  var x = document.getElementById(id);
  var result = false;
  if (x == null) {
    result = getRadioButtonValue(id);
    console.log('treating ' + id + " as a radio button with result = " + result);
  }
  else {
    var type = x.type;
    if (type == 'checkbox') {
      result = document.getElementById(id).checked;
      console.log('treating ' + id + " as a checkbox with result = " + result);
    }
    if (type == "text") {
      result = document.getElementById(id).value;
      console.log('treating ' + id + " as a textbox with result = " + result);
    }
    if (type ==select-one") {
      result = document.getElementById(id).value;
      console.log('treating ' + id + " as a select with result = " + result);
    }
  }
  return(result);
}
