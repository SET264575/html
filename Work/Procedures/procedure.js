function getRadioButtonValue(name){
  var ele = document.getElementsByName(name);
  for (let i = 0; i < ele.length; i++){
    if (ele[i].checked){
      if (ele[i].value == 'on'){
        console.log('treating ' + name + " as a radio button without value with result = " + ele[i].labels[0].innnerHTML);
        return(ele[i].labels[0].innerHTML);
      }
      else
      {
        console.log('treating ' + name + " as a radio button with value = " + ele[i].value);
        return(ele[i].value);
      }
    }
  }
  return(false);
}

function getValue(id) {
  var x = document.getElementById(id);
  var result = false;
  if (x == null) {
    result = getRadioButtonValue(id);
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
    if (type == "select-one") {
      result = document.getElementById(id).value;
      console.log('treating ' + id + " as a select with result = " + result);
    }
  }
  if (result == false) {result = "__________";}
  
  return(result);
}

function isCompleted(list) {
  var x;
  var id;
  var result = true;
  for (let i = 0; i < list.length; i++) {
    id = list[i];
    x = getValue(id);
    if (x == false) {
      result = false;
    }
    else {
      if (document.getElementById(id).type == 'text') {
        if (x == '') {
          result = false;
        }
      }
    }
    return(result);
  }
}

//text functions

function digitalBlockText() {
  if (anestheticTechnique == "1") {
    t = "Procedure Note: Digital block of " + side + " " + finger + "finger\n";
    t = t + "The risks, benefits, and alternatives were discussed with the patient who gave verbal consent. ";
    t = t +"The block was indicated for "+ indication+". ";
    t = t + "A total of " + dose + " cc of ";
    t = t + anesthetic;
    t = t + " was injected at the base of the digit. ";
    if (aspiration) {
      t = t + "To avoid injecting into a blood vessel, aspiration was performed prior to injection. ";
    }
    t = t + "The patient tolerated the procedure well.  Adequate anesthesia was obtained. There were no complications. \n\n";
  } 
}

function displayText(t) {
  navigator.clipboard.writeText(t);
  document.getElementById("text").value = t;
}


//load fragments
function load(tag) {
  $(document).ready(function(){
    $('#div_'+tag).load("Fragments/"+tag+".html");
  });
}

function anesthetic() {load('anesthetic')}
function consent(){load('consent') }
function digitalblock() {load('digital block')}
function side() {load('side') }
function header() {load('header') }
function finger() {load('finger') }
function digit() {load('digit') }




