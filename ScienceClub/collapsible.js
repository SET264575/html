var coll = document.getElementsByClassName("collapsible");
var divContent = document.getElementsByClassName("content");
var i;
var j;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    for (j = 0; j <divContent.length; j++) {
	divContent[j].style.display = "none";
    }
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
