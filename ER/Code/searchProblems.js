/*

<input type="text" list="cars" id = "in" autofocus>
<datalist id="cars">
</datalist>
*/
function searchProblems(){
	const selected = [];

	synonym = {};
	synonym['gi bleeding'] = ['gi bleeding','gi hemorrhage','brbpr','blood in stool','hematemesis'];
	synonym['hyperkalemia'] = ['hyperkalemia','hi k','elevated potassium','hi potassium','high k','high potassium','elevated k'];
	synonym['chest pain'] = ['chest pain','cp'];
	synonym['abdominal pain'] =['abdominal pain','ap','abd pain'];
	synonym['dehydration'] = ['dehydration'];
	synonym['sepsis'] = ['sepsis','sirs'];
	synonym['critical care'] = ['critical care','cc'];
	synonym['altered mental status'] = ['altered mental status','ams','confusion','obtundation','obtunded','confused','coma'];
	synonym['osteomyelitis'] = ['osteomyelitis','diabetic foot infection','bone infection'];
	synonym['flank pain'] = ['flank pain','kidney stone','k stone','stone'];
	synonym['dyspnea'] = ['dyspnea','sob','shortness of breath'];
	synonym['vomiting'] = ['vomiting','emesis','nausea'];
	synonym['hypokalemia'] = ['hypokalemia','low k','low potassium'];
	synonym['drug overdose'] = ['drug overdose','overdose','od'];
	synonym['suicidal'] = ['suicidal','psych placement','depression','psychotic','psychosis'];
	synonym['headache'] = ['headache','ha','head pain'];
	synonym['stroke'] = ['stroke','cva','acute stroke','acute cva'];
	synonym['intracranial hemorrhage'] = ['intracranial hemorrhage','head bleed','sah','subarachnoid hemorrhage','epidural bleed','subdural bleed','intraparenchymal bleeding'];
	synonym['diarrhea'] = ['diarrhea'];
	synonym['cough'] = ['cough'];
	synonym['dka'] = ['dka','hyperglycemia','high sugar','high blood sugar','diabetic ketoacidosis'];
	synonym['trauma'] = ['trauma','major trauma','minor trauma','trunk injury','head injury'];
	synonym['uti'] = ['uti','dysuria','urinary frequency','urinary urgency','pyelonephritis','kidney infection','bladder infection'];
	synonym['hematuria'] = ['hematuria','blood in urine'];
	synonym['ovarian mass'] = ['ovarian mass','ovarian cyst'];
	synonym['anemia'] = ['anemia','iron deficiency anemia','blood loss anemia'];
	synonym['hypoglycemia'] = ['hypoglycemia','low blood sugar','low sugar'];
	synonym['pulmonary embolism'] = ['pulmonary embolism','pe'];
	synonym['dvt'] = ['dvt','deep venous thrombosis','venous thrombosis','blood clot'];
	synonym['elevated anion gap'] = ['elevated anion gap','high anion gap','high ag', 'hi ag'];
	synonym['seizure'] = ['seizure','sz'];
	synonym['cancer'] = ['cancer','ca','mets','lung cancer','liver mets','bone mets','brain mets','liver cancer','colon cancer'];
	synonym['weight loss'] = ['weight loss','wt loss'];
	synonym['dissection'] = ['dissection'];
	synonym['mi'] = ['mi','stemi','myocardial infarction','heart attack'];
	synonym['ovarian torsion'] = ['ovarian torsion'];
	synonym['pelvic pain'] = ['pelvic pain'];
	synonym['vaginal discharge'] = ['vaginal discharge'];
	synonym['fracture'] = ['fracture','fx','broken bone'];
	synonym['pleural effusion'] = ['pleural effusion'];
	synonym['pericardial effusion'] = ['pericardial effusion'];
	synonym['cellulitis'] = ['cellulitis'];
	synonym['seizure'] = ['seizure'];
	synonym['weakness'] = ['weakness'];
	synonym['dizziness'] = ['dizziness'];
	synonym['neck pain'] = ['neck pain'];
	synonym['epistaxis'] = ['epistaxis','nose bleed'];
	synonym['hemoptysis'] = ['hemoptysis'];
	synonym['leg swelling'] = ['leg swelling'];
	synonym['leg pain'] = ['leg pain'];
	synonym['hyponatremia'] = ['hyponatremia','low na','low sodium','lo na','lo sodium'];
	synonym['hypernatremia'] = ['hypernatremia'];
	synonym['laceration'] = ['laceration','lac','head lac','hand lac','finger lac','arm lac'];
	synonym['palliative care'] = ['palliative care'];
	synonym['extubation'] = ['extubation'];
	synonym['leukocytosis'] = ['leukocytosis'];
	synonym['asthma'] = ['asthma'];
	synonym['copd'] = ['copd'];
	synonym['allergic reaction'] = ['allergic reaction'];
	synonym['dental pain'] = ['dental pain','toothache'];
	synonym['std'] = ['std','gc','chlamydia','syphilis','syphillis'];
	synonym['chf'] = ['chf'];
	synonym['urinary retention'] = ['urinary retention'];
	synonym['shock'] = ['shock','septic shock','distributive shock','cardiogenic shock','hypotension','low blood pressure'];
	synonym['atrial fibrillation'] = ['atrial fibrillation','atrial fib','af','atrial fib with rvr','rvr'];
	synonym['dislocation'] = ['dislocation','ankle dislocation','knee dislocation','patellar dislocation','hip dislocation','shoulder dislocation'];
	synonym['finger dislocation'] = ['finger dislocation'];
	synonym['back pain'] = ['back pain','low back pain','lbp','thoracic back pain','lumbar pain','upper back pain','lumbar back pain'];
	synonym['compression fracture'] = ['compression fracture','vertebral compression fracture'];
	synonym['meningitis'] = ['meningitis'];
	synonym['croup'] = ['croup'];
	synonym['cauda equina'] = ['cauda equina'];
	synonym['urinary retention'] = ['urinary retention'];
	synonym['neutropenia'] = ['neutropenia','low white blood count'];
	synonym['thrombocytopenia'] = ['thrombocytopenia','low platelet count'];
	synonym['rsv'] = ['rsv'];
	synonym['flu'] = ['flu','influenza'];
	synonym['croup'] = ['croup'];
	synonym['fall'] = ['fall'];
	synonym['jaw pain'] = ['jaw pain'];
	synonym['leg pain'] = ['leg pain'];
	synonym['priapism'] = ['priapism'];
	synonym['esrd'] = ['esrd'];
	synonym['syncope'] = ['syncope','fainting'];
	synonym['respiratory failure'] = ['respiratory failure','co2 retention','hypoxia','hypoxemia','hypercarbia','hypercapnea'];
	synonym['elevated d dimer'] = ['elevated d dimer'];
	synonym['lactic acidosis'] = ['lactic acidosis','elevated lactate','high lactate'];
	synonym['lightheadedness'] = ['lightheadedness','lh'];
	synonym['post-intubation'] = ['post=intubation','post-intubation','post intubation','intubation'];
	synonym['hypertension'] = ['hypertensive emergency','hypertensive urgency','hypertension','high blood pressure','elevated blood pressure','htn'];
	/*
	joint effusion
	joint pain
	found down
	weakness
	tia
	ckd
	esrd
	secondary hyperparathyroidism
	gerd
	hld
	mha
	cough
	knee pain
	adhd
	bph
	tachycardia
	fall
	dizzy
	vertigo
	leukopenia
	thrombocytopenia
	alcohol abuse
	neck pain
	*/
	dict = {};
	for (x of Object.keys(synonym)) {
		for (y of synonym[x]) {
			dict[y] = x;
		}
	}

	symptomlist = Object.keys(dict);
	symptomlist.sort();

	var t = "";
	for (let i = 0; i<symptomlist.length; i++) {
	  t = t + '<option>'+symptomlist[i]+'</option>';
	}
	document.getElementById('cars').innerHTML = t;

	const input = document.getElementById('in');
	input.addEventListener('keyup',(event) => {
		if (event.keyCode === 13) {
			let prefix = document.getElementById('in').value;
			let elm = document.getElementById('cars').firstElementChild;
			let count = 0;
			let q = "";
			while (elm) {
				if (elm.value.startsWith(prefix)) {
					count++;
					q = elm.value;
				}

				elm = elm.nextElementSibling;
			}
			if (count == 1) {
				document.getElementById('in').value = '';
				return(dict[q]);
				//selected.push(dict[q]);
				//document.getElementById('selected').innerHTML = document.getElementById('selected').innerHTML + '\n'+dict[q];
				//showOrders();
			}
		}
	});
}



