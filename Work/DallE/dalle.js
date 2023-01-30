function getImage() {
  var list = ["DALL·E 2023-01-29 15.36.46 - A fantasy tree house occupied by gnomes.png",
"DALL·E 2023-01-29 15.35.41 - android robot doctor gritty cyberpunk in the style of blade runner digital art.png",
"DALL·E 2023-01-29 15.35.13 - steampunk robot scientist in the style of 20,000 leagues under the sea digital art hd.png",
"DALL·E 2023-01-29 15.34.27 - steampunk robot physician with syringe, bolts and gears, brown pallet.png",
"DALL·E 2023-01-29 15.33.37 - steampunk physician doctor scientist robot built with steel plates, bolts and gears, holding a syringe, brown pallet, digital art hd.png",
"DALL·E 2023-01-29 15.32.58 - steampunk robot  in style of vitruvian man.png",
"DALL·E 2023-01-29 15.32.39 - steampunk robot  in style of vitruvian man.png",
"DALL·E 2023-01-29 15.32.17 - steampunk robot  in style of vitruvian man.png",
"DALL·E 2023-01-29 15.31.32 - squirrel in style of vitruvian man multiple limbs.png",
"DALL·E 2023-01-29 15.30.48 - sick girl in bed, mother in chair at bedside holding her hand, father standing at end of bed talking to physician in style of 1930s, digital art hd.png",
"DALL·E 2023-01-29 15.30.28 - futuristic sick bay on spaceship, digital art, hd.png",
"DALL·E 2023-01-29 15.22.06 - steampunk physician doctor teddy bear, holding a stethoscope, brown pallet, photo.png",
"DALL·E 2023-01-29 15.21.38 - steampunk physician doctor teddy bear, holding a stethoscope, brown pallet, photo.png",
"DALL·E 2023-01-29 15.21.17 - steampunk physician doctor teddy bear, holding a stethoscope, brown pallet, photo.png",
"DALL·E 2023-01-29 15.20.06 - steampunk physician doctor robot, holding a stethoscope, brown pallet, digital art hd, style of high fantasy.png",
"DALL·E 2023-01-29 15.19.33 - steampunk physician doctor robot, holding a stethoscope, brown pallet, digital art hd, style of high fantasy.png",
"DALL·E 2023-01-29 15.17.55 - steampunk physician doctor scientist robot, holding a stethoscope, brown pallet, digital art hd.png",
"DALL·E 2023-01-29 15.17.25 - steampunk physician doctor scientist robot, holding a stethoscope, brown pallet, digital art hd.png"];

  var n = parseInt(Math.random()*list.length);
  if (Math.random()>0.8) {
    return(list[n]);
  }
  else {
    return('');
  }
}

function displayImage() {
  var x = getImage(); 
  if (x != '') {
      var y = "../../Work/DallE/"+x;
      document.getElementById('img').src = y;
  }
}
