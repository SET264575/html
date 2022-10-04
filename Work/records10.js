//Improvements:

// done - Put work up and note in 2 columns
// done - Add textbox for dx, problems
//  done - formatting:  don't vertically center
//  done - formatting:  buttons to left side
//  done - release room with button
//  DONE - put dx in textarea
//  done - more table cells
//  done - larger text area
//  done = larger buttons
//  done - document ct
//  done - note consult if consult checked
//  done - box for ekg
//  done - time activities
//  done - Special:  chest pain, sepsis, DKA, pancreatitis, stroke
//  done - continue negative countdown
//  done - needs space after comma
//  done - bold numbers on activity
//  done - split awaiting into task and time separately


//  *Pending labs:  UA, repeat troponin 
//  done - EKG disappears
//  *national IV shortage
//  done - change text color
//  done - to do tasks:  print labs, prescriptions, work note, consult, 
//  done - buttons to show what needs done on pt:  see patient, consult, meds, labs, procedure, work note, prescription
//  done - separate box for plan
//  done = button to red

//  save to file
//  IV contrast not used
//  conditions:  admitting, neuro, night, number of patients
//  list awaiting at bottom of each room
//  diagnosis at the top
//  add to list of charts to finish

//  Procedure note:
//	laceration
//	cardioversion
//	conscious sedation
//	joint reduction
//	joint aspiration
//	I&D
//	paronychia drainage
//	nerve block
//	LP


//  MDM:
//	Sepsis
//	Heart score
//	Pancreatitis
//	Stroke

console.log("429");


function Room() {
  this.mine = false;
  this.wu_orders =  true;
  this.wu_workuppending =  false;
  this.wu_labspending =  true;
  this.wu_ua = false;
  this.wu_trop = false;
  this.wu_EKGresult = "";
  this.wu_imagingpending =  true;
  this.wu_CTresult = "";
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
  this.wu_plan = "";
  this.note_hpi = true;
  this.note_ros = true;
  this.note_pe = true;
  this.note_course = true;
  this.note_consult = false;
  this.note_procedure = false;
  this.note_mdm = true;
  this.note_ct = false;
  this.note_ekg = true;
  this.note_disposition = true;
  this.note_sign = true;
  this.awaiting = [];
}

class Awaiting {
	constructor(activity,t){
		this.label = activity;
		this.minutes = t;
	}
}

class AwaitingList {
	constructor(activity,t,room,c){
       		this.activity = activity;
		this.minutes = t;
		this.room = room;
		this.clr = c;
	}
	label() {
		return("<b>"+String(this.minutes) +"</b> min - Rm <b>"+String(this.room)+"</b>: "+this.activity);
	}
	color() {
		return(['black','blue','red'][this.clr]);
	}
}

const awaiting = [];
const toDo = [];

const awaitingList = [];
const toDoList = [];

for (let i = 0; i < 16; i++){
	toDoList[i] = [];
}

awaiting.push(new Awaiting("nurse/tech/secretary result",10));
awaiting.push(new Awaiting("troponin",60));
awaiting.push(new Awaiting("urinalysis",30));
awaiting.push(new Awaiting("x ray",30));
awaiting.push(new Awaiting("CT",30));
awaiting.push(new Awaiting("US",30));
//awaiting.push(new Awaiting("repeat troponin 2 hours",120));
//awaiting.push(new Awaiting("nosebleed",30));
awaiting.push(new Awaiting("digital block",10));
awaiting.push(new Awaiting("repage consult",15));
awaiting.push(new Awaiting("Teleradiology read",60));
//awaiting.push(new Awaiting("urinalysis",30));
awaiting.push(new Awaiting("response to medication",20));
//awaiting.push(new Awaiting("response to medications 60 minutes",60));
awaiting.push(new Awaiting("reassess patient",10));
//awaiting.push(new Awaiting("reassess 15 minutes",15));
//awaiting.push(new Awaiting("reassess 20 minutes",20));
//awaiting.push(new Awaiting("reassess 30 minutes",30));
//awaiting.push(new Awaiting("reassess 1 hour",60));
//awaiting.push(new Awaiting("reassess 2 hours",120));
awaiting.push(new Awaiting("review tests",10));
//awaiting.push(new Awaiting("review tests",20));
//awaiting.push(new Awaiting("review tests",30));

toDo.push(new Awaiting("See Patient",-1));
toDo.push(new Awaiting("Order Labs",-1));
toDo.push(new Awaiting("Order Meds",-1));
toDo.push(new Awaiting("Procedure",-1));
toDo.push(new Awaiting("Consult",-1));
toDo.push(new Awaiting("Admit",-1));
toDo.push(new Awaiting("Discharge",-1));
toDo.push(new Awaiting("Prescriptions",-1));
toDo.push(new Awaiting("Work Note",-1));
toDo.push(new Awaiting("Referral",-1));
toDo.push(new Awaiting("Outpt Order",-1));
toDo.push(new Awaiting("Document Critical Care",-1));
toDo.push(new Awaiting("Document Procedure",-1));
toDo.push(new Awaiting("Finish Note",-1));
//toDo.push(new Awaiting("Procedure",-1));




const room = [];
const default_room = new Room;

for (let i = 1; i < 17; i++){
  room[i] = new Room;
}

setInterval(updateAwaitList,60000);

function displayRecords(){
  createAwaitList();
	
  let j = 0;
  for (let i = 1; i < 17; i++) {
    if (room[i].mine == true){
      j = j + 1;
      createRecord(i,j);
    }
  }
}

function createAwaitList(){
  var t = document.createDocumentFragment();
  var x = document.createElement("div");
  var y = "";
  for (let i = 0; i < awaitingList.length;i++){
	y = y + '<button onclick = "deleteFromAwaitingList(this.name)" style="color:'+awaitingList[i].color()+'" name = "'+String(i)+'"><h4>'+awaitingList[i].label()+"</h4></button><br>";
  }
  x.innerHTML = y;
  if (awaitingList.length > 0) {
	document.getElementById("awaitListPlaceholder").appendChild(x);
  }
}

function createRecord(i,j){
  var tree2 = document.createDocumentFragment();
  var x = document.createElement("button");
  x.innerHTML = "Room "+String(i);
  x.setAttribute("class","button2");
  x.setAttribute("name",i);
 // x.setAttribute("width","70");
  x.setAttribute("onclick","deleteRoom(this.name)");
  tree2.appendChild(x);
  var x = document.createElement("table");
  x.innerHTML = '<tr><td style="vertical-align:  top;"><p id = "demo'+String(j)+'col1"></p></td><td style="vertical-align:  top;"><p id = "demo'+String(j)+'col2"></p></td></tr>';
  tree2.appendChild(x);
  tree2.appendChild(createTextbox(i));
 // tree2.appendChild(createEKGbox(i));
 // tree2.appendChild(createCTbox(i));
  document.getElementById("demo"+String(j)).appendChild(tree2);
 

//createCheckboxes();

 
}

function createCheckboxes(){

  var tree = document.createDocumentFragment();
  t = createCheckbox(i,room[i].wu_orders,"Orders");
  tree.appendChild(t);
  t= createCheckbox(i,room[i].wu_workuppending,"Work up");
  tree.appendChild(t);
  if (room[i].wu_workuppending == true){
  //  tree.appendChild(indent());
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
  t = createCheckbox(i,room[i].note_ct, "CT ");
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
  var x = document.createElement("label");
  x.htmlFor = i;
  x.innerHTML = label;
  t.appendChild(x);
  var x = document.createElement("br");
  t.appendChild(x);
  return(t);
  
}

function createLabel(i,text){
  var x = document.createElement("label");
  x.setAttribute("label",text);
  return(x);
}

function createTextbox(i) {
  var t = document.createDocumentFragment();
  var x = document.createElement("br");
  t.appendChild(x);
  var x = document.createElement("label");
  x.setAttribute("for","rm"+String(i)+"_dx");
  x.innerHTML = "Problems/diagnoses:";
  t.appendChild(x);
  var x = document.createElement("br");
  t.appendChild(x);
  // Textbox for Problems/Dx:
  var x = document.createElement("textarea");
  x.setAttribute("rows","10");
  x.setAttribute("cols","25");
  x.setAttribute("wrap","soft");
  x.setAttribute("onchange","recordTextboxValue(this.name,this.value)");
  x.setAttribute("id","rm"+String(i)+"_dx");
  x.setAttribute("name",i);
  x.value = room[i].wu_dx;
  t.appendChild(x);


//Plan box
  var x = document.createElement("br");
  t.appendChild(x);
  var x = document.createElement("label");
  x.setAttribute("for","rm"+String(i)+"_dx");
  x.innerHTML = "Plan:";
  t.appendChild(x);
  var x = document.createElement("br");
  t.appendChild(x);
  var x = document.createElement("textarea");
  x.setAttribute("rows","10");
  x.setAttribute("cols","25");
  x.setAttribute("wrap","soft");
  x.setAttribute("onchange","recordPlanValue(this.name,this.value)");
  x.setAttribute("id","rm"+String(i)+"_plan");
  x.setAttribute("name",i);
  x.value = room[i].wu_plan;
  t.appendChild(x);

//EKG box
  var x = document.createElement("br");
  t.appendChild(x);
  var x = document.createElement("button");
  x.innerHTML = "EKG";
  x.setAttribute("onclick","copyEKG("+String(i)+")");
  t.appendChild(x);
  var x = document.createElement("br");
  t.appendChild(x);
  // Textbox for EKG:
  var x = document.createElement("textarea");
  x.setAttribute("rows","5");
  x.setAttribute("cols","25");
  x.setAttribute("wrap","soft");
  x.setAttribute("oninput","changeEKG(this.name)");
  x.setAttribute("id","rm"+String(i)+"_ekg");
  x.setAttribute("name",i);
  x.value = room[i].wu_EKGresult;
  t.appendChild(x);
//Textbox for CT:
  var x = document.createElement("br");
  t.appendChild(x);

 // var x = document.createElement("button");
  //x.innerHTML = "CT";
  //x.setAttribute("onclick","copyCT("+String(i)+")");
  //t.appendChild(x);
  var x = document.createElement("br");
  t.appendChild(x);
  var x = document.createElement("select");
  var y = "<option>- pick image type -</option>";
	y = y + "<option>CTA head and neck with IV contrast</option>";
	y = y + "<option>CT head without IV contrast</option>";
	y = y + "<option>CT head and facial bones</option>";
	y = y + "<option>CT facial bones</option>";
	y = y + "<option>CT cervical spine</option>";
	y = y + "<option>CT soft tissue of the neck</option>";
	y = y + "<option>CTA chest PE protocol</option>";
	y = y + "<option>CT chest without contrast</option>";
	y = y + "<option>CT abdomen & pelvis without IV contrast</option>";
	y = y + "<option>CT abdomen & pelvis with IV contrast</option>";
	y = y + "<option>CT pelvis</option>";
	y = y + "<option>CT lumbar spine</option>";
	y = y + "<option>US pelvis</option>";
	y = y + "<option>MRI brain</option>";
	y = y + "<option>MRI cervical spine</option>";
	y = y + "<option>MRI lumbar spine</option>";
  x.setAttribute("onchange","copyCT(this.value,this.name)");
  x.setAttribute("id","selectImaging");
  x.setAttribute("name",i);
  x.innerHTML = y;
  t.appendChild(x);

  var x = document.createElement("textarea");
  x.setAttribute("rows","5");
  x.setAttribute("cols","25");
  x.setAttribute("wrap","soft");
  x.setAttribute("onchange","changeCT(this.name)");
  x.setAttribute("id","rm"+String(i)+"_ct");
  x.setAttribute("name",i);
  x.value = room[i].wu_CTresult;
  t.appendChild(x);

//Awaiting dropdown
  t.appendChild(document.createElement("br"));
  t.appendChild(document.createElement("br"));

  var x = document.createElement("select");
  var y = "<option>- pick awaiting -</option>";
  for (let i = 0; i < awaiting.length; i++){
	y = y+"<option>"+awaiting[i].label+"</option>";
  }
//  x.setAttribute("onchange","setAwaiting(this.selectedIndex,this.name)");
  x.setAttribute("id","select"+String(i));
  x.setAttribute("name",i);
  x.innerHTML = y;
  t.appendChild(x);
	
  t.appendChild(document.createElement("br"));
  var timeArray = [10,15,20,30,60,120];	
  for (let j = 0; j < timeArray.length;j++){
  	var x = document.createElement("button");
  	x.innerHTML = String(timeArray[j]);
	x.setAttribute("id", "timeButton"+String(timeArray[j])+"-"+String(i));
	x.setAttribute("name",i);
	x.setAttribute("onclick","setAwaiting("+String(i)+","+String(timeArray[j])+")");
	t.appendChild(x);
  }
t.append(document.createElement("br"));

t.append(document.createElement("br"));

//to do list
for (let j = 0; j < toDo.length; j++){
	//console.log(toDo.label);
	var x = document.createElement("button");
	x.innerHTML = toDo[j].label;
	x.setAttribute("id","button"+String(i)+"_"+String(j));
	x.setAttribute("name",String(i));
	x.setAttribute("style","width:100px;");
	x.setAttribute("onclick",'toDoButtonClicked('+String(i)+',"'+toDo[j].label.toUpperCase()+'")');
	t.appendChild(x);
//	t.appendChild(document.createElement("br"));
}

t.appendChild(document.createElement("br"));
t.appendChild(document.createElement("br"));

for (let j = 0; j < toDoList[i].length; j++){
	var x = document.createElement("button");
	x.innerHTML = toDoList[i][j].label;
	console.log(toDoList[i][j].label);
	x.setAttribute("onclick","toDoListButtonClicked("+String(i)+","+String(j)+")");
	x.setAttribute("style","width:  200px; color:  red;");
	t.appendChild(x);
	t.appendChild(document.createElement("br"));
}



  return(t);
}

function toDoButtonClicked(room,label){
	toDoList[room].push(new Awaiting(label,-1));
	console.log(label);
	refreshTable();
	displayRecords();
}

function toDoListButtonClicked(room,j){
	toDoList[room].splice(j,1);
	refreshTable();
	displayRecords();
}	

function setAwaiting(room,t){
	var x = document.getElementById("select"+String(room));
	var txt = x.value;
	awaitingList.push(new AwaitingList(txt,t,room,0));
	sortArray();
	toDoButtonClicked(room,txt);
	refreshTable();
	displayRecords();
}

function checkboxChanged(value, label, i) {
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
      if (value) {
	room[i].note_procedure = true;
      }
      break;
    case "Consult":
      room[i].wu_consult = value;
      if (value) {
	room[i].note_consult = true;
      }
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
    case "CT":
	room[i].note_ct = value;
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
  toDoButtonClicked(i,"SEE PATIENT");
  refreshTable();
  displayRecords();
}

function deleteRoom(i){
  room[i].mine = false;
  toDoList[i] = [];
 
  refreshTable();
  displayRecords();
}

function changeEKG(i){
  var input = document.getElementById("rm"+String(i)+"_ekg");
  var value = input.value;

  if (!value.includes(", rate")) {
	const myArray = value.trim().split("\n");
        var l = myArray[0].length + 7;
  	value = "";
  	value = myArray[0]+", rate  , ";
  	for (let i = 1;i < myArray.length-1; i++){
		value = value + myArray[i][0].toLowerCase()+myArray[i].substring(1)+", ";
 	}
	value = value + myArray[myArray.length -1][0].toLowerCase()+myArray[myArray.length-1].substring(1);
   	//room[i].wu_EKGresult = value;
  	input.value = value;
        input.setSelectionRange(l,l+1);
  // refreshTable();
  // displayRecords();
  }
  room[i].wu_EKGresult = value;
}

function changeCT(i){
	room[i].wu_CTresult = document.getElementById("rm"+String(i)+"_ct").value;
}

function copyEKG(i){
  var value = document.getElementById("rm"+String(i)+"_ekg").value;
  
  room[i].wu_EKGresult = value;
  navigator.clipboard.writeText(value);
 // refreshTable();
 // displayRecords();
}

function copyCT(typeOfImage,i){
  var value = document.getElementById("rm"+String(i)+"_ct").value;
  room[i].wu_CTresult = "There is currently a national shortage of IV contrast.\n\nPreliminary report from Teleradiology of the "+typeOfImage+":\n"+value;
  value = room[i].wu_CTresult;
  navigator.clipboard.writeText(room[i].wu_CTresult);
  refreshTable();
  displayRecords();
}

function deleteFromAwaitingList(i){
	awaitingList.splice(i,1);
	refreshTable();
	displayRecords();
}

function updateAwaitList(){
  for (let i = 0; i < awaitingList.length;i++){
	awaitingList[i].minutes--;
	if (awaitingList[i].minutes < 0){
		awaitingList[i].clr = 2;
	}
  }
  refreshTable();
  displayRecords();
}

function refreshTable(){
  var x = document.getElementById('awaitListPlaceholder');
  x.innerHTML = "";
  var x = document.getElementById('table1');
  x.innerHTML = '      <tr>\
        <td class = "td1"> <p id="demo1"></p> </td>\
        <td class = "td1"> <p id="demo2"></p> </td>\
        <td class = "td1"> <p id="demo3"></p> </td>\
        <td class = "td1"> <p id="demo4"></p> </td>\
        <td class = "td1"> <p id="demo5"></p> </td>\
        <td class = "td1"> <p id="demo6"></p> </td>\
      </tr>\
      <tr>\
        <td class = "td1"> <p id="demo7"></p> </td>\
        <td class = "td1"> <p id="demo8"></p> </td>\
        <td class = "td1"> <p id="demo9"></p> </td>\
        <td class = "td1"> <p id="demo10"></p> </td>\
        <td class = "td1"> <p id="demo11"></p> </td>\
        <td class = "td1"> <p id="demo12"></p> </td>\
      </tr>';
}

function recordTextboxValue(i,value){
  room[i].wu_dx = value;
}

function recordPlanValue(i,value){
  room[i].wu_plan = value;
}

function indent(){
  var t = document.createElement("h6");
  t.innerHTML = "text";
  return(t);
}

function sortArray(){
	awaitingList.sort(function(a,b){return(a.minutes - b.minutes)});
}


function copyAdmitDoc(){
	var dr = document.getElementById("physicians").value;
	var x = dr.split(",");
	navigator.clipboard.writeText("At "+currentTime() + ", I discussed the situation with Dr. "+x[0]+" who will admit");
}

// Parse timestamp in YYYY-MM-DDTHH:mm:ss format as local
function parseDateString(s) {
  var b = s.split(/\D/g);
  return new Date(b[0], --b[1], b[2], b[3], b[4], b[5], 0);
}

// Format time as hh:mm AM/PM
function formatHHMM(date) {
  function z(n) {
    return (n < 10 ? '0' : '') + n;
  }
  var h = date.getHours();
  return z(h % 12 || 12) + ':' + z(date.getMinutes()) + ' ' + (h < 12 ? 'AM' : 'PM');
}

function currentTime(){
	return(formatHHMM(parseDateString(Date.now())));
}
		
		
