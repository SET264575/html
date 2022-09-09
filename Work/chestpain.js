      var pts = [];
      var total = 0;

      function getText2(){
	pts = [];
	total = 0;
	var text = '';
	createText(getRadioValue('history'),'history');
	createText(getRadioValue('age'),'age');
	createText(getRadioValue('EKG'),'EKG');
	createText(getRadioValue('risk factors'),'risk factors');
   	createText(getRadioValue('troponin'),'troponin');
	text = combine(pts);
	text = "HEART score was " + total + " with " + text + ". ";
	if (total < 4){
		text = text + "With a HEART score in this range, the risk of major adverse cardiac event within the next 6 weeks is less than 2%.";
	}
	if (total > 3) {
		text = text + "Given the risk of a major adverse cardiac event, the patient was admitted.";
	}
	console.log(text);
	navigator.clipboard.writeText(text);
      }

      function getRadioValue(id) {
            var ele = document.getElementsByName(id);
            var value = "";
            for(i = 0; i < ele.length; i++) {
                if(ele[i].checked){
                	value = ele[i].value;
			console.log(value);
		}
            }
	return(value);
        }

      function createText(value,id){
	var t = '';
	switch(value) {
		case '0':
			t = '';
			break;
		case '1':
			t = '1 point for '+ id;
			pts.push(t);
			total++;
			break;
		case '2':
			t = '2 points for ' + id;
			pts.push(t);
			total = total + 2;
			break;
	  }
	}

	function combine(x){
		var t = x[0];
		for (let i =1; i < x.length-1;i++){
			t = t + ", "+x[i];
		}
		if (x.length > 1) {
			t = t + " and "+x[x.length-1];
		}
		return(t);
	}
