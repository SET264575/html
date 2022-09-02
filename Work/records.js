const room = {
  mine: false,
  wu_orders:  true,
  wu_workuppending:  true,
  wu_labspending:  true,
  wu_imagingpending:  true,
  wu_procedurepending: true,
  wu_disposition: none,
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
}

function createCheckbox(flag,label) {
  var x = document.createElement("INPUT");
  x.setAttribute("type", "checkbox");
  x.setAttribute("value",flag);
  x.setAttribute("label",label);
  x.setAttribute("id","rm"+str(i)+"_orders");
  document.body.appendChild(x);
}
  
