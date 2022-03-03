const form = document.querySelector('#form');
const input = document.querySelector('#text');
const output = document.querySelector('#output');

const re = /^First.(.*?).Second.(.*?)$/mg;

function convertText(inputText) {

	let array = [...inputText.value.matchAll(re)];
	output.textContent = '';
	for (let i = 0; i < array.length; i++){
		output.textContent = output.textContent + array[i][1]+' '+array[i][2]+'\n';
	}

}

form.addEventListener('submit',(event) => {event.preventDefault(); convertText(input);});

