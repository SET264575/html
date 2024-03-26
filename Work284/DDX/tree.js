var toggler = document.getElementsByClassName("caret");
var i;

for (i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function() {
	console.log(this);
    this.parentElement.querySelector(".nested").classList.toggle("active");
    this.classList.toggle("caret-down");
  });
}

function showAll(){
	for (let j = 0; j < toggler.length; j++) {
		toggler[j].parentElement.querySelector(".nested").classList.add("active");
		toggler[j].classList.add("caret-down");
	}
}