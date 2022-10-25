function copy2(){
	var text = "";
	const SIRS = [];
	var lactate = "";
	var cause = "";
	var treatment = [];
	var pending = [];

	if (getValue('leukocytosis')) {SIRS.push("leukocytosis");}
	if (getValue('fever')) {SIRS.push("fever");}
	if (getValue('tachycardia')) {SIRS.push("tachycardia");}
	if (getValue('tachypnea')) {SIRS.push("tachypnea");}

	text = "The patient meets SIRS criteria with "+ combine(SIRS) + ".";

	if (getValue('highlactate')) {lactate = "elevated";}
	if (getValue("lowlactate")) {lactate = "not elevated";}

	text = text + " Lactate was " + lactate + ".";

	text = text + " The patient appears to be septic due to " + document.getElementById('cause').value+'. ';

	if (getValue('IVF')) {treatment.push("IV normal saline");}
	if (getValue('IVF30')) {treatment.push("IV normal saline at 30 cc/kg");}
	if (getValue('Rocephin')) {treatment.push("Rocephin");}
	if (getValue('Vanc')) {treatment.push("Vancomycin");}
	if (getValue('Zosyn')) {treatment.push("Zosyn");}
	if (getValue('Zithromax')) {treatment.push("Zithromax");}
	if (getValue('Cipro')) {treatment.push("Cipro");}
	if (getValue('Flagyl')) {treatment.push("Flagyl");}
	if (getValue('Vanc & Zosyn')) {
		treatment.push("Vanc");
		treatment.push("Zosyn");
	}
	if (getValue('Rocephin & Zithromax')) {
		treatment.push("Rocephin");
		treatment.push("Zithromax");
	}
	if (getValue("Cipro & Flagyl")) {
		treatment.push("Cipro");
		treatment.push("Flagyl");
	}

	text = text + "Treatment initiated in the ER included " + combine(treatment) +'. ';
	
	if (getValue('CT')) {pending.push("CT chest, abdomen and pelvis");}
	if (getValue('UA')) {pending.push('urinalysis');}
	if (getValue('RPP')) {pending.push('respiratory pathogen panel');}
	if (getValue('chest x-ray')) {pending.push('chest x-ray');}
	if (getValue('procalcitonin')) {pending.push('procalcitonin');}
	if (getValue('C dif')) {pending.push('C dif');}
	if (getValue('GI path')) {pending.push('GI pathogen profile');}
	if (getValue('ESR')) {pending.push('ESR');}
	if (getValue('CRP')) {pending.push('CRP');}

	if (pending.length > 0) {
		text = text + 'Pending tests include ' + combine(pending);
	}

	document.getElementById('textarea').value = text;
	navigator.clipboard.writeText(text);
}

function getValue(id){
	return(document.getElementById(id).checked);
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
