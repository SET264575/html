function generateText() {
  var t = "";
  var list = document.getElementsByTagName('input');
  for (let i = 0; i < list.length; i++) {
    if (list[i].checked) {
      t = t + list[i].value+"\n";
    }
    else {
      t = t + "[" + list[i].value + "]\n";
    }
  }
}
