 function isAnyChecked(name) {
  var ele = document.getElementsByName(name);
  for (let i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      return(true);
    }
  }
  return(false);
}

function isPlural(name) {
  var ele = document.getElementsByName(name);
  var count = 0;
  for (let i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      count++;
    }
  }
  if (count > 1) {
    return(true);
  }
  else {
    return(false);	
  }
}
        
function combineItemsFromButtons(name) {
  var ele = document.getElementsByName(name);
  var list = [];
  for (let i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      list.push(ele[i].value);
    }
  }
  var t = list[0];
  for (let i = 1; i<list.length-1; i++) {
    t = t + ", "+ list[i];
  }
  if (list.length>1) {
    t = t + " and " + list[list.length-1];
  }
  return(t);
}

function combineItemsFromList(list) {
  var t = list[0];
  for (let i = 1; i<list.length-1; i++) {
    t = t + ", "+ list[i];
  }
  if (list.length>1) {
    t = t + " and " + list[list.length-1];
  }
  return(t);
}
        
function getRadioButtonValue(name){
  var ele = document.getElementsByName(name);
  for (let i = 0; i < ele.length; i++){
    if (ele[i].checked){
      return(ele[i].value);
    }
  }
  return('____________________');
}
        
function isChecked(id) {
  return(document.getElementById(id).checked);
}
