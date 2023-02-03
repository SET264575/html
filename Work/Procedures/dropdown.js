
const selected = [];

synonym = {};
synonym['abdomen'] = ['abdomen'];
synonym['ankle'] = ['ankle'];
synonym['anterior neck'] = ['anterior neck'];
synonym['buttock'] = ['buttock'];
synonym['calf'] = ['calf'];
synonym['cheek'] = ['cheek'];
synonym['chest'] = ['chest'];
synonym['dorsum of hand'] = ['dorsum of hand','back of hand'];
synonym['elbow'] = ['elbow'];
synonym['epigastric region'] = ['epigastric region','epigastrium'];
synonym['eyebrow'] = ['eyebrow'];
synonym['face'] = ['face'];
synonym['fingers'] = ['fingers'];
synonym['forearm'] = ['forearm'];
synonym['forefoot'] = ['forefoot'];
synonym['forehead'] = ['forehead'];
synonym['great toe'] = ['great toe'];
synonym['hand'] = ['hand'];
synonym['heel'] = ['heel'];
synonym['hip'] = ['hip'];
synonym['inner thigh'] = ['inner thigh'];
synonym['knee'] = ['knee'];
synonym['lateral malleolus'] = ['lateral malleolus'];
synonym['lateral thigh'] = ['lateral thigh'];
synonym['left abdomen'] = ['left abdomen','l abd','l abdomen'];
synonym['left ankle'] = ['left ankle','l ankle'];
synonym['left anterior neck'] = ['left anterior neck','l anterior neck'];
synonym['left buttock'] = ['left buttock','l buttock'];
synonym['left calf'] = ['left calf','l calf'];
synonym['left cheek'] = ['left cheek','l cheek'];
synonym['left chest'] = ['left chest','l chest'];
synonym['dorsum of left hand'] = ['left dorsum of hand','dorsum of left hand','dorsum l hand','l dorsum hand'];
synonym['left elbow'] = ['left elbow','l elbow'];
synonym['left eyebrow'] = ['left eyebrow','l eyebrow'];
synonym['left face'] = ['left face','l face'];
synonym['left fingers'] = ['left fingers','l fingers'];
synonym['left forearm'] = ['left forearm','l forearm'];
synonym['left forefoot'] = ['left forefoot','l forefoot'];
synonym['left forehead'] = ['left forehead','l forehead'];
synonym['left great toe'] = ['left great toe','l great toe'];
synonym['left hand'] = ['left hand','l hand'];
synonym['left heel'] = ['left heel','l heel'];
synonym['left hip'] = ['left hip','l hip'];
synonym['left inner thigh'] = ['left inner thigh','l inner thigh','inner l thigh'];
synonym['left knee'] = ['left knee','l knee'];
synonym['left lateral malleolus'] = ['left lateral malleolus','l lateral malleolus'];
synonym['left lateral thigh'] = ['left lateral thigh','l lateral thigh'];
synonym['left lower quadrant'] = ['left lower quadrant','llq','LLQ'];
synonym['left upper quadrant'] = ['left upper quadrant','luq','LUQ'];
synonym['left lip'] = ['left lip','l lip'];
synonym['left lower back'] = ['left lower back','l lower back'];
synonym['left lower leg'] = ['left lower leg','l lower leg'];
synonym['left lower lip'] = ['left lower lip','l lower lip'];
synonym['left medial malleolus'] = ['left medial malleolus','l medial malleolus'];
synonym['left midfoot'] = ['left midfoot','l midfoot'];
synonym['left neck'] = ['left neck','l neck'];
synonym['left nose'] = ['left nose','l nose'];
synonym['left occiput'] = ['left occiput','l occiput'];
synonym['left occipital scalp'] = ['left occipital scalp','l occipital scalp'];
synonym['left palm'] = ['left palm','l palm'];
synonym['left parietal scalp'] = ['left parietal scalp','l parietal scalp'];
synonym['left perineum'] = ['left perineum','l perineum'];
synonym['left posterior neck'] = ['left posterior neck','l posterior neck'];
synonym['left sacrum'] = ['left sacrum','l sacrum'];
synonym['left scalp'] = ['left scalp','l scalp'];
synonym['left shoulder'] = ['left shoulder','l shoulder'];
synonym['left shoulder blade'] = ['left shoulder blade','l shoulder blade','l scapula','left scapula'];
synonym['left thigh'] = ['left thigh','l thigh'];
synonym['left thoracic back'] = ['left thoracic back','l thoracic back'];
synonym['left toes'] = ['left toes','l toes'];
synonym['left tongue'] = ['left tongue','l tongue'];
synonym['left upper arm'] = ['left upper arm','l upper arm'];
synonym['left upper extremity'] = ['left upper extremity','lue','LUE'];
synonym['left upper lip'] = ['left upper lip','l upper lip'];
synonym['left upper quadrant'] = ['left upper quadrant','luq','LUQ'];
synonym['left wrist'] = ['left wrist','l wrist'];
synonym['lip'] = ['lip'];
synonym['lower back'] = ['lower back'];
synonym['lower leg'] = ['lower leg'];
synonym['lower lip'] = ['lower lip'];
synonym['medial malleolus'] = ['medial malleolus'];
synonym['midfoot'] = ['midfoot'];
synonym['neck'] = ['neck'];
synonym['nose'] = ['nose'];
synonym['occiput'] = ['occiput'];
synonym['occiputal scalp'] = ['occiputal scalp'];
synonym['palm'] = ['palm'];
synonym['parietal scalp'] = ['parietal scalp'];
synonym['perineum'] = ['perineum'];
synonym['periumbilical region'] = ['periumbilical region'];
synonym['posterior neck'] = ['posterior neck'];
synonym['right abdomen'] = ['right abdomen','r abdomen'];
synonym['right ankle'] = ['right ankle','r ankle'];
synonym['right anterior neck'] = ['right anterior neck','r anterior neck'];
synonym['right buttock'] = ['right buttock','r buttock'];
synonym['right calf'] = ['right calf','r calf'];
synonym['right cheek'] = ['right cheek','r cheek'];
synonym['right chest'] = ['right chest','r chest'];
synonym['right dorsum of hand'] = ['right dorsum of hand','dorsum of right hand','dorsum of r hand'];
synonym['right elbow'] = ['right elbow','r elbow'];
synonym['right eyebrow'] = ['right eyebrow','r eyebrow'];
synonym['right face'] = ['right face','r face'];
synonym['right fingers'] = ['right fingers','r fingers'];
synonym['right forearm'] = ['right forearm''r forearm'];
synonym['right forefoot'] = ['right forefoot''r forefoot'];
synonym['right forehead'] = ['right forehead','r forehead'];
synonym['right great toe'] = ['right great toe','r great toe'];
synonym['right hand'] = ['right hand','r hand'];
synonym['right heel'] = ['right heel'];
synonym['right hip'] = ['right hip'];
synonym['right inner thigh'] = ['right inner thigh'];
synonym['right knee'] = ['right knee'];
synonym['right lateral malleolus'] = ['right lateral malleolus'];
synonym['right lateral thigh'] = ['right lateral thigh'];
synonym['right left lower quadrant'] = ['right left lower quadrant'];
synonym['right left upper quadrant'] = ['right left upper quadrant'];
synonym['right lip'] = ['right lip'];
synonym['right lower back'] = ['right lower back'];
synonym['right lower leg'] = ['right lower leg'];
synonym['right lower lip'] = ['right lower lip'];
synonym['right lower quadrant'] = ['right lower quadrant'];
synonym['right medial malleolus'] = ['right medial malleolus'];
synonym['right midfoot'] = ['right midfoot'];
synonym['right neck'] = ['right neck'];
synonym['right nose'] = ['right nose'];
synonym['right occiput'] = ['right occiput'];
synonym['right occiputal scalp'] = ['right occiputal scalp'];
synonym['right palm'] = ['right palm'];
synonym['right parietal scalp'] = ['right parietal scalp'];
synonym['right perineum'] = ['right perineum'];
synonym['right periumbilical region'] = ['right periumbilical region'];
synonym['right posterior neck'] = ['right posterior neck'];
synonym['right right lower quadrant'] = ['right right lower quadrant'];
synonym['right right upper quadrant'] = ['right right upper quadrant'];
synonym['right sacrum'] = ['right sacrum'];
synonym['right scalp'] = ['right scalp'];
synonym['right shoulder'] = ['right shoulder'];
synonym['right shoulder blade'] = ['right shoulder blade'];
synonym['right thigh'] = ['right thigh'];
synonym['right thoracic back'] = ['right thoracic back'];
synonym['right toes'] = ['right toes'];
synonym['right tongue'] = ['right tongue'];
synonym['right upper arm'] = ['right upper arm'];
synonym['right upper extremity'] = ['right upper extremity'];
synonym['right upper lip'] = ['right upper lip'];
synonym['right upper quadrant'] = ['right upper quadrant'];
synonym['right wrist'] = ['right wrist'];
synonym['sacrum'] = ['sacrum'];
synonym['scalp'] = ['scalp'];
synonym['shoulder'] = ['shoulder'];
synonym['shoulder blade'] = ['shoulder blade'];
synonym['thigh'] = ['thigh'];
synonym['thoracic back'] = ['thoracic back'];
synonym['toes'] = ['toes'];
synonym['tongue'] = ['tongue'];
synonym['upper arm'] = ['upper arm'];
synonym['upper extremity'] = ['upper extremity'];
synonym['upper lip'] = ['upper lip'];
synonym['vertex'] = ['vertex'];
synonym['wrist'] = ['wrist'];


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
document.getElementById('location_list').innerHTML = t;
console.log(t);

const input = document.getElementById('location');
input.addEventListener('keyup',(event) => {
	console.log(event.keyCode);
	if (document.getElementById('useExact').checked == false) {
		if (event.keyCode === 13) {
			let prefix = document.getElementById('location').value;
			let elm = document.getElementById('location_list').firstElementChild;
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
				document.getElementById('location').value = dict[q];
				//selected.push(dict[q]);
				//document.getElementById('selected').innerHTML = document.getElementById('selected').innerHTML + '\n'+dict[q];
			}
		}
	}
});
