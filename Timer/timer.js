(() => {
	element = document.getElementById("time");
	t = 0;
	let id = setInterval(updateClock,1000);
})();

function updateClock(){
  t = t + 1;
  element.innerHTML = t;
  //ctx.fillStyle = 'white';
  //ctx.fillRect(0,0,1000,1000);
  //ctx.font = "30px Comic Sans MS";
  //ctx.fillStyle = 'black';
  //ctx.fillText("test",0,0);
}
