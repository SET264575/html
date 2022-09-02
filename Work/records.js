const room = {
  mine: false,
  wu_orders:  true,
  wu_workuppending:  true,
  wu_labspending:  true,
  wu_imagingpending:  true,
  wu_procedurepending: true,
  wu_consult: true,
  wu_disposition: false,
  admit_bedrequest: true,
  admit_discharge: true,
  admit_order: true,
  discharge_dx: true,
  discharge_instructions: true,
  discharge_prescriptions: true,
  discharge_referral: true,
  discharge_outptorders: true,
  discharge_worknote: true,
  wu_problems: "",
  wu_dx: "",
  note_hpi: true,
  note_ros: true,
  note_pe: true,
  note_course: true,
  note_consult: true,
  note_mdm: true,
  note_ekg: true,
  note_disposition: true,
  note_sign: true
}

for (let i = 1; i < 17; i++){
  room[i] = new room;
  console.print(room[i]);
}

createRecord(1,1);

function createRecord(i,j){
  document.getElementById("demo"+str(j)).innerHTML = "Room "+str(i);
  createCheckbox(room[i].wu_orders,"Orders");
  createCheckbox(room[i].wu_workuppending,"Work up");
  createCheckbox(room[i].wu_labspending,"Labs");
  createCheckbox(room[i].wu_imagingpending,"Imaging");
  createCheckbox(room[i].wu_procedurepending,"Procedure");
  createCheckbox(room[i].consult,"Consult");
  createCheckbox(room[i].wu_admit,"Admit");
  createCheckbox(room[i].wu_discharge,"Discharge");
  createCheckbox(room[i].note_hpi,"HPI");
  createCheckbox(room[i].note_consult,"Consult");
  createCheckbox(room[i].note_mdm,"MDM");
  createCheckbox(room[i].note_ekg,"EKG");
  createCheckbox(room[i].note_disposition,"Disposition");
  createCheckbox(room[i].note_sign,"Sign");
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
  
