var toggler = document.getElementsByClassName("caret");
var i;

for (i = 0; i < toggler.length; i++) {
//  toggler[i].parentElement.querySelector(".nested").classList.toggle("active");//
//  toggler[i].classList.toggle("caret-down");
  toggler[i].addEventListener("click", function() {
    console.log(this);
    this.parentElement.querySelector(".nested").classList.toggle("active");
    this.classList.toggle("caret-down");
  });
}
