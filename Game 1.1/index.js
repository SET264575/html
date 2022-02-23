wwidth = window.screen.availWidth;

let cellWidth = 2;
if (window.screen.availWidth > 1500){
//	cellWidth = 5;
}


let ballX = 50;
let ballY = 80;

let vx = 1;
let vy = 1;
let score = 0;

let sz = 143;
let array = new Array(sz);

for (let i = 0; i < sz; i++){
	array[i] = new Array(sz);
}


for (let i = 0; i < sz; i++){
	for (let j = 0; j < sz; j++){
		array[i][j] = 0;
	}
}

for (let i = 1; i< sz-1; i++){
	array[i][1] = 1;
	array[i][sz-2] = 1;
	array[1][i] = 1;
	array[sz-2][i] = 1;
}



(() => {
    	const main = document.querySelector('#main');
    	if (!main.getContext) {
        	return;
    	}

    // get the context
    	ctx = main.getContext('2d');
    	main.addEventListener('click',(event) =>{click(event,ctx);});


	let id = setInterval(moveBall,10);
	

	

})();

function click(e,ctx){
	let x = Math.round(e.offsetX/(20*cellWidth))*20*cellWidth;
	let y = Math.round(e.offsetY/(20*cellWidth))*20*cellWidth;
	let i = Math.sign(e.offsetX - x);
	let j = Math.sign(e.offsetY - y);
	let flag = Math.abs(e.offsetX - x) - Math.abs(e.offsetY - y);
	score = score + 100;

	if (flag > 0){
		let m = Math.floor((x)/cellWidth);
		let n = Math.floor(y/cellWidth);
		if (i > 0){
			for (let k = m; k < m+21; k++){	
				array[k][n] = 1;
			}
		}
		else {
			for (let k = m-20; k < m+1; k++) {
				array[k][n] = 1;
			}
		}
	}
	else {
		let m = Math.floor(x/cellWidth);
		let n = Math.floor((y)/cellWidth);
		if (j > 0){
			for (let k = n; k < n+21; k++){	
				array[m][k] = 1;
			}
		}
		else {
			for (let k = n-20; k < n+1; k++) {
				array[m][k] = 1;
			}
		}
	}
}

function drawArray(){
	ctx.fillStyle = 'blue';
	ctx.strokeStyle = 'blue';
	let wdth = cellWidth;
	for (let i = 0; i < sz; i++){
		for (let j= 0; j < sz; j++){
			if (array[i][j] == 1){
				ctx.fillRect(i*wdth,j*wdth,wdth,wdth);
			}
		}
	}
}

	
function draw(){
	clear();
	score = score + 1;
	drawScore();
	drawPhantom();
	drawArray();
	drawBall();
}

function clear(){
	ctx.fillStyle = 'white';
	ctx.fillRect(0,0,1000,1000);

	for (let i = 0; i< sz; i++){
		array[i][0] = 0;
		array[i][sz-1] = 0;
		array[0][i] = 0;
		array[sz-1][i] = 0;
	}
}

function drawScore(){
	ctx.fillStyle = 'white';
	ctx.fillRect(200*cellWidth,150,300,300);
	ctx.font = "30px Comic Sans MS";
	ctx.fillStyle = 'black';
	ctx.fillText(score,200*cellWidth,200);
//	ctx.fillText(wwidth,200*cellWidth,500);
}

function drawPhantom(){
	ctx.fillStyle = 'lightgray';
	for (let i = 10; i < 70; i=i+10){
		ctx.fillRect(i*2*cellWidth,cellWidth,cellWidth,140*cellWidth);
		ctx.fillRect(cellWidth,i*2*cellWidth,140*cellWidth,cellWidth);
	}
}

function moveBall(){
	vx1 = vx;
	vy1 = vy;
	if (array[ballX+vx][ballY+vy] == 1){
		//console.log(ballX+vx, ballY+vy);
		if (array[ballX + vx -1][ballY+vy] == 1) {
			vy1 = -vy;
		}
		if (array[ballX+vx][ballY+vy-1] == 1) {
			vx1 = -vx;
		}
	}
	vx  = vx1;
	vy = vy1;

	ballX = ballX + vx;
	ballY = ballY + vy;

	draw();
}

function drawBall(){
	ctx.fillStyle = 'red';
	ctx.beginPath();
	ctx.arc(ballX*cellWidth,ballY*cellWidth,cellWidth,0,2*3.14159);
	ctx.fill();	
}

