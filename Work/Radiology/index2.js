const form = document.querySelector('#form');
const input = document.querySelector('#text');

//const re = /ORDER..............(.*?).$IMPRESSION:$(.*?)/mgs;
const re = /ORDER.{14}(.*?)$.*?IMPRESSION.*?^(.*?)The above report was dictated/mgs;

function convertText(inputText) {

	let array = [...inputText.value.matchAll(re)];
	let output = 'I have reviewed these radiology images personally.\n';
	console.log(array);
	for (let i = 0; i < array.length; i++){
		let secarray = array[i][1].replace('XR/XR ','X-ray of the ');

		output = output + secarray +' shows: \n'+array[i][2]+'\n';
	}
	document.getElementById('out').value = output;	

}

function clearText(){
	document.getElementById('out').value = '';
}

form.addEventListener('submit',(event) => {event.preventDefault(); convertText(input);});
form.addEventListener('clear',(event) =>{clearText();});
