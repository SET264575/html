var physObj = {};
getObject('json/physicians.txt');
function getObject(website){
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onload = function() { physObj = JSON.parse(this.responseText); displayAdmitting(); displayConsulting(); displayOutconsulting()};
  xmlhttp.open("GET",website);
  xmlhttp.send();
}

function displayAdmitting() {
	var t = "";
	for (let i =0; i<physObj.admitting.length; i++) {
    t = t + '<button class="collapsible subsubsubheadingbutton">'+physObj.admitting[i].specialty+'</button>\n';
    t = t +'      <div class = "content">\n';
    t = t + '      <ul class="radiobutton">\n';

    for (let j = 0; j < physObj.admitting[i].physician.length; j++) {
      let phys = physObj.admitting[i].physician[j];
      t = t +  ' <li><input type = "checkbox" id="Dr. '+ phys + '" name= "admitting" onclick="check(this.id)" value="Dr. '+phys + '"><label for = "Dr. '+phys+'">Dr. '+phys+'</label></li>\n'
    }
	  t = t + "</ul></div><br><br>\n";
	}
	document.getElementById('admittingbuttons').innerHTML =  t;
}

function displayConsulting() {
	var t = "";
	for (let i =0; i<physObj.consulting.length; i++) {
    t = t + '<button class="collapsible subsubsubheadingbutton">'+physObj.consulting[i].specialty+'</button>\n';
    t = t +'      <div class = "content">\n';
    t = t + '      <ul class="radiobutton">\n';

    for (let j = 0; j < physObj.consulting[i].physician.length; j++) {
      let phys = physObj.consulting[i].physician[j];
      t = t +  ' <li><input type = "checkbox" id="consultingDr. '+ phys + '" name= "consulting" onclick="check(this.id)" value="Dr. '+phys + '"><label for = "consultingDr. '+phys+'">Dr. '+phys+'</label></li>\n'
    }
	  t = t + "</ul></div><br><br>\n";
	}
	document.getElementById('consultingbuttons2').innerHTML =  t;
}

function displayOutconsulting() {
	var t = "";
	for (let i =0; i<physObj.consulting.length; i++) {
    t = t + '<button class="collapsible subsubsubheadingbutton">'+physObj.consulting[i].specialty+'</button>\n';
    t = t +'      <div class = "content">\n';
    t = t + '      <ul class="radiobutton">\n';

    for (let j = 0; j < physObj.consulting[i].physician.length; j++) {
      let phys = physObj.consulting[i].physician[j];
      t = t +  ' <li><input type = "checkbox" id="outconsultingDr. '+ phys + '" name= "outconsulting" onclick="check(this.id)" value="Dr. '+phys + '"><label for = "outconsultingDr. '+phys+'">Dr. '+phys+'</label></li>\n'
    }
	  t = t + "</ul></div><br><br>\n";
	}
	document.getElementById('consultingbuttons').innerHTML =  t;
}
