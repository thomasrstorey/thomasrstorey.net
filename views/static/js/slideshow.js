/*
  slideshow runner script
  thomasrstorey.net
  Thomas R Storey
  2016
*/
var ssContainer = document.getElementById("slideshow-container");
var slides = ssContainer.childNodes;
var current = 0,
   next = 1;
for (var i = 0; i != slides.length; i++) {
  console.log(i);
  if(i === current){
    slides[i].className = "slide slide-active slide-out";
    slides[i].addEventListener("animationend", transitionOut, false);
  } else if (i === next){
    slides[i].className = "slide slide-active slide-in";
    slides[i].addEventListener("animationend", transitionIn, false);
  } else {
    slides[i].className = "slide slide-queued";
  }
}

function transitionOut(e){
  var ele = slides[current];
  ele.className = "slide slide-queued";
  ele.removeEventListener("animationend", transitionOut, false);
  current = (current+1)%slides.length;
}

function transitionIn(e){
  var ele = slides[next];
  ele.className = "slide slide-active slide-out";
  ele.removeEventListener("animationend", transitionIn, false);
  ele.addEventListener("animationend", transitionOut, false);
  next = (next+1)%slides.length;
  slides[next].className="slide slide-active slide-in";
  slides[next].addEventListener("animationend", transitionIn, false);
}
