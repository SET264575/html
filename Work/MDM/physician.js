var physObj = {};
getObject('json/physician.txt');
function getObject(website){
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onload = function() { physObj = JSON.parse(this.responseText); displayHTML();};
  xmlhttp.open("GET",website);
  xmlhttp.send();
}

function displayPhysicians() {
	
	var t = "";
	for (let i =0; i<physObj.specialty.length; i++) {
    t = t + '<button class="collapsible subsubheadingbutton">Orthopedics</button>';
    t = t +'      <div class = "content">';
    t = t + '      <ul class="radiobutton">';

		for (let j = 0; j < physObj.list[i].physician.length; j++) {
      let phys = physObj.list[i].physician[j];
			t = t +  ' <li><input type = "checkbox" id="Dr. '+ phys + '" name= "consulting" onclick="check(this.id)" value="Dr. '+phys + '"><label for = "Dr. '+phys+'">Dr. '+phys+'</label></li>'
    }
		t = t + "</ul></div><br><br>\n";
	}
	t = t + "</ul>";
	document.getElementById('ddxbuttons').innerHTML =  t;
}
