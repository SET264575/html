function showHTML() {
  var t = "<ul class = 'radiobutton'>";
  for (let i = 0; i<myObj.group.length; i++) {
    t = t + "<li><input type = 'checkbox' value = '"+myObj.group[i].label + "'><label for = '"+myObj.group[i].label+"'>"+myObj.group[i].label+"</label>";
    
    
  }
  t = t + "</ul>";
  return(t);
}
