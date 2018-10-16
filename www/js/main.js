$('#navbar').load("http://2018.igem.org/Template:Rotterdam_HR/navbar?action=raw&ctype=text/html");
$('#footer').load("http://2018.igem.org/Template:Rotterdam_HR/footer?action=raw&ctype=text/html");

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}
