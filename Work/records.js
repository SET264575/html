function Room() = {
  this.mine = false;
  this.wu_orders =  true;
  this.wu_workuppending =  true;
  this.wu_labspending=  true;
  this.wu_imagingpending =  true;
  this.wu_procedurepending= true;
  this.wu_consult= true;
  this.wu_disposition= false;
  this.admit_bedrequest= true;
  this.admit_discharge= true;
  this.admit_order= true;
  this.discharge_dx= true;
  this.discharge_instructions= true;
  this.discharge_prescriptions= true;
  this.discharge_referral= true;
  this.discharge_outptorders= true;
  this.discharge_worknote= true;
  this.wu_problems= "";
  this.wu_dx= "";
  this.note_hpi= true;
  this.note_ros= true;
  this.note_pe= true;
  this.note_course= true;
  this.note_consult= true;
  this.note_mdm= true;
  this.note_ekg= true;
  this.note_disposition= true;
  this.note_sign= true;
}

for (let i = 1; i < 17; i++){
  room[i] = new Room;
  console.log(room[i]);
}

createRecord(1,1);

function createRecord(i,j){
  document.getElementById("demo"+str(j)).innerHTML = "Room "+str(i);
  createCheckbox(i,room[i].wu_orders,"Orders");
  createCheckbox(i,room[i].wu_workuppending,"Work up");
  createCheckbox(i,room[i].wu_labspending,"Labs");
  createCheckbox(i,room[i].wu_imagingpending,"Imaging");
  createCheckbox(i,room[i].wu_procedurepending,"Procedure");
  createCheckbox(i,room[i].consult,"Consult");
  createCheckbox(i,room[i].wu_admit,"Admit");
  createCheckbox(i,room[i].wu_discharge,"Discharge");
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
  x.setAttribute("value",flag);
  x.setAttribute("label",label);
  x.setAttribute("id","rm"+str(i)+"_orders");
  document.body.appendChild(x);
}

function createTextbox(i,label) {
  var x = document.createElement("INPUT");
  x.setAttribute("type","text");
  x.setAttribute("label","dx");
  x.setAttribute("tag",i);
  x.setAttribute("id","rm"+str(i)+"_dx");
  document.body.appendChild(x);
}
  
