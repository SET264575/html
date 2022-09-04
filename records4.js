//Improvements:

// done - Put work up and note in 2 columns
// done - Add textbox for dx, problems
//  Pending labs:  UA, repeat troponin
// done - Redraw when room selected or box checked - don't reload, will erase data.  
//  Indent labs, etc
//  timing of events
//  save to file
//  formatting:  don't vertically center
//  formatting:  buttons to left side
//  done - release room with button
//  DONE - put dx in textarea

function Room() {
  this.mine = false;
  this.wu_orders =  true;
  this.wu_workuppending =  false;
  this.wu_labspending =  true;
  this.wu_imagingpending =  true;
  this.wu_procedurepending = false;
  this.wu_consult = false;
  this.wu_disposition = false;
  this.wu_admit = false;
  this.wu_discharge = false;
  this.admit_bedrequest = true;
  this.admit_discharge = true;
  this.admit_order = true;
  this.discharge_dx = true;
  this.discharge_instructions = true;
  this.discharge_prescriptions = true;
  this.discharge_referral = true;
  this.discharge_outptorders = true;
  this.discharge_worknote = true;
  this.wu_problems = "";
  this.wu_dx = "";
  this.note_hpi = true;
  this.note_ros = true;
  this.note_pe = true;
  this.note_course = true;
  this.note_consult = true;
  this.note_procedure = false;
  this.note_mdm = true;
  this.note_ekg = true;
  this.note_disposition = true;
  this.note_sign = true;
}

const room = [];
const default_room = new Room;

for (let i = 1; i < 17; i++){
  room[i] = new Room;
}

room[3].mine = true;
room[8].mine = true;
room[13].mine = true;

console.log("4:10");

function displayRecords(){
  let j = 0;
  for (let i = 1; i < 17; i++) {
    if (room[i].mine == true){
      j = j + 1;
     // console.log(i,j);
      createRecord(i,j);
    }
  }
}

function createRecord(i,j){
  var tree2 = document.createDocumentFragment();
  var x = document.createElement("button");
  x.innerHTML = "Room "+String(i);
  x.setAttribute("name",i);
  x.setAttribute("onclick","deleteRoom(this.name)");
  tree2.appendChild(x);
  var x = document.createElement("table");
  x.innerHTML = '<tr><td><p id = "demo'+String(j)+'col1"></p></td><td><p id = "demo'+String(j)+'col2"></p></td></tr>';
  tree2.appendChild(x);
  tree2.appendChild(createTextbox(i));
  document.getElementById("demo"+String(j)).appendChild(tree2);
 
  var tree = document.createDocumentFragment();
  //var x = document.createElement("h3");
  //x.innerHTML = "Work up";
 // tree.appendChild(x);
  t = createCheckbox(i,room[i].wu_orders,"Orders");
  tree.appendChild(t);
  t= createCheckbox(i,room[i].wu_workuppending,"Work up");
  tree.appendChild(t);
  if (room[i].wu_workuppending == true){
//    tree.appendChild(indent());
    t =createCheckbox(i,room[i].wu_labspending,"&nbsp;&nbsp;&nbsp;Labs");
    tree.appendChild(t);
//    tree.appendChild(indent());
    t =createCheckbox(i,room[i].wu_imagingpending,"&nbsp;&nbsp;&nbsp;Imaging");
    tree.appendChild(t);
//    tree.appendChild(indent());
    t =createCheckbox(i,room[i].wu_procedurepending,"&nbsp;&nbsp;&nbsp;Procedure");
    tree.appendChild(t);
  }
  t =createCheckbox(i,room[i].wu_consult,"Consult");
  tree.appendChild(t);
  t= createCheckbox(i,room[i].wu_admit,"Admit");
  tree.appendChild(t);
  t = createCheckbox(i,room[i].wu_discharge,"Discharge");
  tree.appendChild(t);
  if (room[i].wu_admit == true) {
//    tree.appendChild(indent());
    t = createCheckbox(i,room[i].admit_discharge,"Discharge ");
    tree.appendChild(t);
//    tree.appendChild(indent());
    t = createCheckbox(i,room[i].admit_order,"Order");
    tree.appendChild(t);
 //   tree.appendChild(indent());
    t = createCheckbox(i,room[i].admit_bedrequest,"Bed request");
    tree.appendChild(t);
  }
  if (room[i].wu_discharge == true) {
 //   tree.appendChild(indent());
    t = createCheckbox(i,room[i].discharge_dx,"Diagnoses");
    tree.appendChild(t);
//    tree.appendChild(indent());
    t = createCheckbox(i,room[i].discharge_prescriptions, "Prescriptions");
    tree.appendChild(t);
  //  tree.appendChild(indent());
    t = createCheckbox(i,room[i].discharge_referral,"Referral");
    tree.appendChild(t);
 //   tree.appendChild(indent());
    t = createCheckbox(i,room[i].discharge_instructions,"Instructions");
    tree.appendChild(t);
  //  tree.appendChild(indent());
    t = createCheckbox(i,room[i].discharge_outptorders,"Outpatient Orders");
    tree.appendChild(t);
 //   tree.appendChild(indent());
    t = createCheckbox(i,room[i].discharge_worknote,"Work Note");
    tree.appendChild(t);
  }
  
  var y = document.getElementById("demo"+String(j)+"col1")
  y.appendChild(tree);
  var tree = document.createDocumentFragment();
//  var x = document.createElement("h3");
//  x.innerHTML = "Note";
//  tree.appendChild(x);
  t = createCheckbox(i,room[i].note_hpi,"HPI");
  tree.appendChild(t);
  t = createCheckbox(i,room[i].note_course,"Course");
  tree.appendChild(t);
  t = createCheckbox(i,room[i].note_consult,"Consult ");
  tree.appendChild(t);
  t = createCheckbox(i,room[i].note_procedure,"Procedure ");
  tree.appendChild(t);
  t = createCheckbox(i,room[i].note_mdm,"MDM");
  tree.appendChild(t);
  t = createCheckbox(i,room[i].note_ekg,"EKG");
  tree.appendChild(t);
  t = createCheckbox(i,room[i].note_disposition,"Disposition");
  tree.appendChild(t);
  t = createCheckbox(i,room[i].note_sign,"Sign");
  tree.appendChild(t);
  document.getElementById("demo"+String(j)+"col2").appendChild(tree);
 
}

function createCheckbox(i,flag,label) {
  var t = document.createDocumentFragment();
  var x = document.createElement("INPUT");
  x.setAttribute("type", "checkbox");
 // x.setAttribute("autocomplete","off");
  if (flag) {
	x.setAttribute("checked",true);
  }
  else {
	x.removeAttribute("checked");
  }
  x.setAttribute("label",label);
  var id = "rm"+String(i)+":"+label;
  x.setAttribute("id",label+"Checkbox"+String(i));
  x.setAttribute("name",label);
  x.setAttribute("onchange","checkboxChanged(this.checked,this.name,"+String(i)+")");
  t.appendChild(x);
 if (label == "Orders") { console.log(x);}
  var x = document.createElement("label");
  x.htmlFor = i;
  x.innerHTML = label;
  t.appendChild(x);
  var x = document.createElement("br");
  t.appendChild(x);
  return(t);
  
}

function createTextbox(i) {
  var x = document.createElement("textarea");
  x.setAttribute("rows","10");
  x.setAttribute("cols","20");
  x.setAttribute("wrap","soft");
  x.setAttribute("onchange","recordTextboxValue(this.name,this.value)");
  x.setAttribute("id","rm"+String(i)+"_dx");
  x.setAttribute("name",i);
  x.value = room[i].wu_dx;
  return(x);
}

function checkboxChanged(value, label, i) {
  console.log(label);
  if (value === undefined) {
	console.log("it's undefined");
}
  console.log(value);
  switch(label) {
    case "Work up":
      room[i].wu_workuppending = value;
      console.log("in Work Up");
      break;
    case "Orders":
      room[i].wu_orders = value;
      console.log(room[i].wu_orders);
      break;
    case "&nbsp;&nbsp;&nbsp;Labs":
      room[i].wu_labspending = value;
      break;
    case "&nbsp;&nbsp;&nbsp;Imaging":
      room[i].wu_imagingpending = value;
      break;
    case "&nbsp;&nbsp;&nbsp;Procedure":
      room[i].wu_procedurepending = value;
      break;
    case "Consult":
      room[i].wu_consult = value;
      break;
    case "Admit":
      room[i].wu_admit = value;
      room[i].wu_discharge = !value;
      break;
    case "Discharge":
      room[i].wu_discharge = value;
      room[i].wu_admit = !value;
      break;
    case "HPI":
	room[i].note_hpi = value;
        break;
    case "Course":
        room[i].note_course = value;
        break;
    case "Consult ":
        room[i].note_consult = value;
        break;
    case "Procedure ":
        room[i].note_procedure = value;
        break;
    case "MDM":
	room[i].note_mdm = value;
        break;
    case "EKG":
	room[i].note_ekg = value;
        break;
    case "Disposition":
	room[i].note_disposition = value;
        break;
    case "Sign":
	room[i].note_sign = value;
        break;
    case "Discharge ":
	room[i].admit_discharge = value;
        break;
    case "Bed request":
	room[i].admit_bedrequest = value;
        break;
    case "Order":
	room[i].admit_order = value;
        break;
    case "Diagnoses":
	room[i].discharge_dx = value;
        break;
    case "Instructions":
	room[i].discharge_instructions = value;
        break;
    case "Prescriptions":
	room[i].discharge_prescriptions = value;
        break;
    case "Referral":
	room[i].discharge_referral = value;
        break;
    case "Outpatient Orders":
	room[i].discharge_outptorders = value;
        break;
    case "Work Note":
	room[i].discharge_worknote = value;
        break;

  }
  refreshTable();
  displayRecords();
  
}

function pickRoom(i){
  room[i] = {...default_room};  //used to deep copy default values
  room[i].mine = true;
  refreshTable();
  displayRecords();
}

function deleteRoom(i){
  room[i].mine = false;
  refreshTable();
  displayRecords();
}

function refreshTable(){
  var x = document.getElementById('table1');
  x.innerHTML = '      <tr>\
        <td class - "td1"> <p id="demo1"></p> </td>\
        <td class - "td1"> <p id="demo2"></p> </td>\
        <td class - "td1"> <p id="demo3"></p> </td>\
        <td class - "td1"> <p id="demo4"></p> </td>\
      </tr>\
      <tr>\
        <td class - "td1"> <p id="demo5"></p> </td>\
        <td class - "td1"> <p id="demo6"></p> </td>\
        <td class - "td1"> <p id="demo7"></p> </td>\
        <td class - "td1"> <p id="demo8"></p> </td>\
      </tr>';
}

function recordTextboxValue(i,value){
  console.log(value);
  console.log(i);
  room[i].wu_dx = value;
  console.log(value);
}

function indent(){
  var t = document.createElement("pre");
  t.innerHTML = "     ";
  return(t);
}

displayRecords();