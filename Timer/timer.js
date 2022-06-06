(() => {
    	const main = document.querySelector('#main');
    	if (!main.getContext) {
        	return;
    	}
    	ctx = main.getContext('2d');
	let id = setInterval(updateClock,10);
})();

function updateClock(){
  t = t + 1;
  ctx.fillStyle = 'white';
  ctx.fillRect(0,0,1000,1000);
  ctx.font = "30px Comic Sans MS";
  ctx.fillStyle = 'black';
  ctx.fillText(t,100,400);
}
