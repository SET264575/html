function showHTML() {
  var t = "<ul class = 'radiobutton'>";
  for (let i = 0; i<myObj.button.length; i++) {
    t = t + "<li><input type = 'checkbox' value = '"+myObj.button[i] + "' onclick= 'check(this.id)'><label for = '"+myObj.button[i]+"'>"+myObj.button[i]+"</label>";
    
    
  }
  t = t + "</ul>";
  return(t);
}
