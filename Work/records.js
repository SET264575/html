//Improvements:

// * Put work up and note in 2 columns
// done - Add textbox for dx, problems
//  Pending labs:  UA, repeat troponin
//  *Redraw when room selected or box checked - don't reload, will erase data.  
//  Indent labs, etc
//  timing of events
//  save to file
//  release room with button

function Room() {
  this.mine = false;
  this.wu_orders =  true;
  this.wu_workuppending =  true;
  this.wu_labspending =  true;
  this.wu_imagingpending =  true;
  this.wu_procedurepending = true;
  this.wu_consult = true;
  this.wu_disposition = false;
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
  this.note_mdm = true;
  this.note_ekg = true;
  this.note_disposition = true;
  this.note_sign = true;
}

const room = [];

for (let i = 1; i < 17; i++){
  room[i] = new Room;
}

room[3].mine = true;
room[8].mine = true;
room[13].mine = true;

console.log("4:06");

function displayRecords(){
  let j = 0;
  for (let i = 1; i < 17; i++) {
    if (room[i].mine == true){
      j = j + 1;
      console.log(i,j);
      createRecord(i,j);
    }
  }
}

function createRecord(i,j){
  var tree2 = document.createDocumentFragment();
  var x = document.createElement("button");
  x.innerHTML = "Room "+String(i);
  x.setAttribute("onclick","deleteRoom(i)")
  tree2.appendChild(x);
  var x = document.createElement("table");
  x.innerHTML = '<tr><td><p id = "demo"+String(j)+"col1"></p></td><td><p id = "demo"+String(j)+"col2"></p></td></tr>';
  tree2.appendChild(x);
  tree2.appendChild(createTextbox());
  console.log(document.documentElement.innerHTML);
  document.getElementById("demo"+String(j)).appendChild(tree2);
  console.log(document.documentElement.innerHTML);
 
  var tree = document.createDocumentFragment();
  var x = document.createElement("h3");
  x.innerHTML = "Work up";
  tree.appendChild(x);
  t = createCheckbox(i,room[i].wu_orders,"Orders");
  tree.appendChild(t);
  t= createCheckbox(i,room[i].wu_workuppending,"Work up");
  tree.appendChild(t);
  if (room[i].wu_workuppending == true){
//    tree.appendChild(indent());
    t =createCheckbox(i,room[i].wu_labspending,"Labs");
    tree.appendChild(t);
//    tree.appendChild(indent());
    t =createCheckbox(i,room[i].wu_imagingpending,"Imaging");
    tree.appendChild(t);
//    tree.appendChild(indent());
    t =createCheckbox(i,room[i].wu_procedurepending,"Procedure");
    tree.appendChild(t);
  }
  t =createCheckbox(i,room[i].consult,"Consult");
  tree.appendChild(t);
  t= createCheckbox(i,room[i].wu_admit,"Admit");
  tree.appendChild(t);
  t = createCheckbox(i,room[i].wu_discharge,"Discharge");
  tree.appendChild(t);
  if (room[i].wu_admit == true) {
//    tree.appendChild(indent());
    t = createCheckbox(i,room[i].admit_discharge,"Discharge");
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
  
  var z = document.documentElement.innerHTML;
  console.log(z);
  var y = document.getElementById("demo"+String(j)+"col1")
  y.appendChild(tree);
  var tree = document.createDocumentFragment();
  var x = document.createElement("h3");
  x.innerHTML = "Note";
  tree.appendChild(x);
  t = createCheckbox(i,room[i].note_hpi,"HPI");
  tree.appendChild(t);
  t = createCheckbox(i,room[i].note_consult,"Consult");
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
  x.setAttribute("checked",!flag);
  x.setAttribute("label",label);
  var id = "rm"+String(i)+":"+label;
  x.setAttribute("id",id);
  x.setAttribute("name",i);
  x.setAttribute("onchange","checkboxChanged(this.checked,this.label, this.name)");
  t.appendChild(x);
  var x = document.createElement("label");
  x.htmlFor = id;
  x.innerHTML = label;
  t.appendChild(x);
  var x = document.createElement("br");
  t.appendChild(x);
  return(t);
  
}

function createTextbox(i,label) {
  var x = document.createElement("textarea");
  x.setAttribute("rows","10");
  x.setAttribute("cols","20");
  x.setAttribute("wrap","soft");
  x.setAttribute("onchange","recordTextboxValue(i,this.value)");
  x.setAttribute("id","rm"+String(i)+"_dx");
  return(x);
}

function checkboxChanged(value, label, i) {
  switch(label) {
    case "Work Up":
      room[i].wu_workuppending = value;
      break;
    case "Orders":
      room[i].wu_orders = value;
      break;
    case "Labs":
      room[i].wu_labspending = value;
      break;
    case "Imaging":
      room[i].wu_imagingpending = value;
      break;
    case "Procedure":
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
  }
  
}

function pickRoom(i){
  room[i].mine = true;
  displayRecords();
}

function deleteRoom(i){
  room[i].mine = false;
  displayRecords();
}

function recordTextboxValue(i,value){
  room[i].wu_dx = value;
}

function indent(){
  var t = document.createElement("pre");
  t.innerHTML = "     ";
  return(t);
}

displayRecords();
