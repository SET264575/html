const submit = document.querySelector('#submit');
const input = document.querySelector('#text');
const btn = document.querySelector('#button');

//const re = /ORDER..............(.*?).$IMPRESSION:$(.*?)/mgs;
//const re = /ORDER.{14}(.*?)$.*?IMPRESSION.*?^(.*?)The above report was dictated/mgs;
const re = /ORDER.{14}(.*?)$/; //.*?IMPRE/msg; //SSION.*?^(.*?)The above report was dictated/mgs;

function convertText(inputText) {

	let array = [...inputText.value.matchAll(re)];
	let output = 'I have reviewed these radiology images personally.\n';
	console.log(array);
	for (let i = 0; i < array.length; i++){
		let secarray = array[i][1].replace('XR/XR ','X-ray of the ');
		secarray = secarray.replace('CT/CT ','CT of the ');
		secarray = secarray.replace('US/US ','US of the ');

		output = output + secarray +' shows: \n'+array[i][2]+'\n';
	}
	document.getElementById('out').value = output;	
	navigator.clipboard.writeText(output);
}

function clearText(){
	console.log("in clearText");
	document.getElementById('text').value = '';
}

submit.addEventListener('click',(event) => {event.preventDefault(); convertText(input);});
btn.addEventListener('click',(event) =>{clearText();});
