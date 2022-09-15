class Syndrome{
	constructor(name, pattern){
		this.name = name;
	
		this.pattern = pattern
	}
	 score(result){
		var s = 0;
		for (let i = 0; i<this.pattern.length;i++){
			s = s + this.pattern[i]*result[i];
		}
		return(s);
	}
		
}
	


const syndromes = [];
syndromes.push(new Syndrome("hyperkalemia",[0,1,0]));
syndromes.push(new Syndrome("hypernatremia",[1,0,0]));
syndromes.push( new Syndrome("facticious hyponatremia",[1,0,1]));
syndromes.push(new Syndrome("hyponatremia",[-1,0,0]));
syndromes.push(new Syndrome("Addisonian crisis",[-1,1,0]));

function changeResult(name,value){
}
	
var testResults = [-1,1,0];
for (let i = 0; i<syndromes.length;i++){
	console.log(syndromes[i].name,syndromes[i].score(testResults));
}


	
