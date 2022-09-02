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
  console.log(room[i]);
}

function displayRecords(){
  let j = 0;
  for (let i = 1; i < 17; i++) {
    if (room[i].mine == true){
      j = j + 1;
      createRecord(i,j);
    }
  }
}

function createRecord(i,j){
  var tree = document.createDocumentFragment();
  var x = document.createElement("h1");
  x.innerHTML = "Room "+String(i);
  x.appendChild(document.createTextNode("linkText");
  tree.appendChild(x);
  document.getElementById("demo1").appendChild(tree);
  
  
  
  
  
  
  //document.getElementById("demo"+String(j)).innerHTML = "Room "+String(i);
  createCheckbox(i,room[i].wu_orders,"Orders");
  createCheckbox(i,room[i].wu_workuppending,"Work up");
  createCheckbox(i,room[i].wu_labspending,"Labs");
  createCheckbox(i,room[i].wu_imagingpending,"Imaging");
  createCheckbox(i,room[i].wu_procedurepending,"Procedure");
  createCheckbox(i,room[i].consult,"Consult");
  createCheckbox(i,room[i].wu_admit,"Admit");
  createCheckbox(i,room[i].wu_discharge,"Discharge");
  if (room[i].wu_admit == true) {
    createCheckbox(i,room[i].admit_discharge,"Discharge");
    createCheckbox(i,room[i].admit_order,"Order");
    createCheckbox(i,room[i].admit_bedrequest,"Bed request");
  }
  if (room[i].wu_discharge == true) {
    createCheckbox(i,room[i].discharge_dx,"Diagnoses");
    createCheckbox(i,room[i].discharge_prescriptions, "Prescriptions");
    createCheckbox(i,room[i].discharge_referral,"Referral");
    createCheckbox(i,room[i].discharge_instructions,"Instructions");
    createCheckbox(i,room[i].discharge_outptorders,"Outpatient Orders");
    createCheckbox(i,room[i].discharge_worknote,"Work Note");
  }
  createCheckbox(i,room[i].note_hpi,"HPI");
  createCheckbox(i,room[i].note_consult,"Consult");
  createCheckbox(i,room[i].note_mdm,"MDM");
  createCheckbox(i,room[i].note_ekg,"EKG");
  createCheckbox(i,room[i].note_disposition,"Disposition");
  createCheckbox(i,room[i].note_sign,"Sign");
}

function createCheckbox(i,flag,label) {
  var x = document.createElement("INPUT");
  x.setAttribute("type", "checkbox");
  x.setAttribute("checked",!flag);
  x.setAttribute("label",label);
  var id = "rm"+String(i)+":"+label;
  x.setAttribute("id",id);
  x.setAttribute("name",i);
  x.setAttribute("onchange","checkboxChanged(this.checked,this.label, this.name)");
  document.body.appendChild(x);
  console.log(x.outerHTML);
  var x = document.createElement("label");
  x.htmlFor = id;
  x.innerHTML = label;
  document.body.appendChild(x);
  console.log(x.outerHTML);
  
}

function createTextbox(i,label) {
  var x = document.createElement("INPUT");
  x.setAttribute("type","text");
  x.setAttribute("label","dx");
  x.setAttribute("name",i);
  x.setAttribute("id","rm"+String(i)+"_dx");
  document.body.appendChild(x);
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
  
createRecord(1,1);
createRecord(2,2);
