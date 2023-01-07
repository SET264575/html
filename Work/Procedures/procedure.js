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
  var type = document.getElementById(id).type;
  var result = false;
  if (type == 'checkbox') {
    result = document.getElementById(id).checked;
  }
  if (type == "radio") {
    result = getRadioButtonValue(id);
  }
  if (type = "text") {
    result = document.getElementById(id).value;
  }
  if (type = "select") {
    result = document.getElementById(id).value;
  }
  return(result);
}
