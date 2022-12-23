var physObj = {};
getObject('json/physicians.txt');
function getObject(website){
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onload = function() { physObj = JSON.parse(this.responseText); displayAdmitting(); displayConsulting()};
  xmlhttp.open("GET",website);
  xmlhttp.send();
}

function displayAdmitting() {
	var t = "";
	for (let i =0; i<physObj.admitting[i].length; i++) {
    t = t + '<button class="collapsible subsubheadingbutton">'+physObj.admitting[i].specialty+'</button>';
    t = t +'      <div class = "content">';
    t = t + '      <ul class="radiobutton">';

    for (let j = 0; j < physObj.admitting[i].physician.length; j++) {
      let phys = physObj.admitting[i].physician[j];
      t = t +  ' <li><input type = "checkbox" id="Dr. '+ phys + '" name= "admitting" onclick="check(this.id)" value="Dr. '+phys + '"><label for = "Dr. '+phys+'">Dr. '+phys+'</label></li>'
    }
	  t = t + "</ul></div><br><br>\n";
	}
	t = t + "</ul>";
	document.getElementById('admittingbuttons').innerHTML =  t;
	console.log(t);
}

function displayConsulting() {
	var t = "";
	for (let i =0; i<physObj.consulting[i].length; i++) {
    t = t + '<button class="collapsible subsubheadingbutton">'+physObj.consulting[i].specialty+'</button>';
    t = t +'      <div class = "content">';
    t = t + '      <ul class="radiobutton">';

    for (let j = 0; j < physObj.consulting[i].physician.length; j++) {
      let phys = physObj.consulting[i].physician[j];
      t = t +  ' <li><input type = "checkbox" id="consultingDr. '+ phys + '" name= "consulting" onclick="check(this.id)" value="Dr. '+phys + '"><label for = "consultingDr. '+phys+'">Dr. '+phys+'</label></li>'
    }
	  t = t + "</ul></div><br><br>\n";
	}
	t = t + "</ul>";
	document.getElementById('consultingbuttons').innerHTML =  t;
	console.log(t)
}
