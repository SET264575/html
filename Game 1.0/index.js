


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
		//array[i][0] = 1;
		array[i][sz-2] = 1;
		//array[i][sz-1] = 1;
		array[1][i] = 1;
		//array[0][i] = 1;
		array[sz-2][i] = 1;
		//array[sz-1][i] = 1;
	}

(() => {
    const main = document.querySelector('#main');
    if (!main.getContext) {
        return;
    }

    // get the context
    ctx = main.getContext('2d');
   // main.addEventListener('click',(event) =>{console.log('clicked');});
    main.addEventListener('click',(event) =>{click(event,ctx);});


	let id = setInterval(moveBall,10);
	

	

})();

function click(e,ctx){
	//ctx.strokeStyle = 'blue';
	let x = Math.round(e.offsetX/100)*100;
	let y = Math.round(e.offsetY/100)*100;
	let i = Math.sign(e.offsetX - x);
	let j = Math.sign(e.offsetY - y);
	let flag = Math.abs(e.offsetX - x) - Math.abs(e.offsetY - y);
	score = score + 100;

	//ctx.beginPath();
	if (flag > 0){
		//ctx.moveTo(x + 100*i,y);
		//ctx.lineTo(x+0,y);
		let m = Math.floor((x)/5);
		let n = Math.floor(y/5);
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
		//ctx.moveTo(x,y+100*j);
		//ctx.lineTo(x,y+0);
		let m = Math.floor(x/5);
		let n = Math.floor((y)/5);
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
	//ctx.stroke();
      //  console.log(e.offsetX,e.offsetY);
}

function drawArray(){
	ctx.fillStyle = 'blue';
	ctx.strokeStyle = 'blue';
	let wdth = 5;
	for (let i = 0; i < sz; i++){
		for (let j= 0; j < sz; j++){
			if (array[i][j] == 1){
				ctx.fillRect(i*wdth,j*wdth,wdth,wdth);
				//console.log(i,j)
			}
			else {
				//ctx.strokeRect(i*wdth,j*wdth,wdth,wdth);
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
		//array[i][0] = 1;
		array[i][sz-1] = 0;
		//array[i][sz-1] = 1;
		array[0][i] = 0;
		//array[0][i] = 1;
		array[sz-1][i] = 0;
		//array[sz-1][i] = 1;
	}
}

function drawScore(){
	ctx.fillStyle = 'white';
	ctx.fillRect(1000,150,300,300);
	ctx.font = "30px Comic Sans MS";
	ctx.fillStyle = 'black';
	ctx.fillText(score,1000,200);
	
}



function drawPhantom(){
	ctx.fillStyle = 'lightgray';
	for (let i = 10; i < 70; i=i+10){
		ctx.fillRect(i*10,5,5,700);
		ctx.fillRect(5,i*10,700,5);
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
	ctx.arc(ballX*5,ballY*5,5,0,2*3.14159);
	ctx.fill();	
}

    // set fill and stroke styles
  //  ctx.fillStyle = '#F0DB4F';
//    ctx.strokeStyle = 'red';

    // draw a rectangle with fill and stroke
   // ctx.fillRect(50, 50, 150, 100);
    ////ctx.strokeRect(50, 50, 150, 100);
    
  //  ctx.fillStyle = '#FFF';
  //  ctx.fillRect(80,80,150,100);
  //  ctx.strokeRect(80,80,150,100);