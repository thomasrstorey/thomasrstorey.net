/*
  slideshow runner script
  thomasrstorey.net
  Thomas R Storey
  2016
*/
var ssContainer = document.getElementById("slideshow-container");
var slides = ssContainer.childNodes;
var buttonContainer = document.getElementById("slide-button-container");
var buttons = buttonContainer.childNodes;

var current = slides[0];
var currentBtn = buttons[0];

var clicked = null;
var clickedBtn = null;
if(slides.length > 1){
    for (var i = 0; i != slides.length; i++) {
      if(i === 0){
        slides[i].className = "slide slide-active slide-out";
        buttons[i].className = "slide-button active";
        slides[i].addEventListener("animationend", transition, false);
      } else if (i === 1){
        slides[i].className = "slide slide-active slide-in";
      } else {
        slides[i].className = "slide slide-queued";
      }
      buttons[i].id = i;
      buttons[i].addEventListener("click", buttonTransition, false);
    }
} else {
  for (var i = 0; i != slides.length; i++) {
    if(i === 0){
      slides[i].className = "slide slide-active";
      buttons[i].className = "slide-button active";
      slides[i].addEventListener("animationend", transition, false);
    }
  }
}


function transition ( e ) {
  if(e.animationName == "slidein" || e.animationName == "slideinnow"){
    return;
  }
  current.className = "slide slide-queued";
  currentBtn.className = "slide-button";
  current.removeEventListener("animationend", transition, false);

  if(current.nextSibling != null){
    current = current.nextSibling;
    currentBtn = currentBtn.nextSibling;
  } else {
    current = slides[0];
    currentBtn = buttons[0];
  }

  current.className = "slide slide-active slide-out";
  currentBtn.className = "slide-button active";
  current.addEventListener("animationend", transition, false);

  if(current.nextSibling != null){
    current.nextSibling.className = "slide slide-active slide-in";
  } else {
    slides[0].className = "slide slide-active slide-in";
  }
}

function buttonTransition ( e ) {
  if(e.target === currentBtn){
    console.log("do nothing");
    return;
  }
  clickedBtn = e.target;
  clicked = slides[e.target.id];
  console.log("do somthing");
  // slide now!
  current.className = "slide slide-active slide-out-now";
  current.removeEventListener("animationend", transition, false);
  current.addEventListener("animationend", buttonTransitionComplete, false);
  // unqueue current next slide
  if(current.nextSibling != null){
    current.nextSibling.className = "slide slide-queued";
  } else {
    slides[0].className = "slide slide-queued";
  }
  //queue clicked button's slide to slide in now!
  slides[e.target.id].className = "slide slide-active slide-in-now";
};

function buttonTransitionComplete ( e ) {
  if(e.animationName == "slidein"){
    return;
  }
  current.className = "slide slide-queued";
  currentBtn.className = "slide-button";
  current.removeEventListener("animationend", buttonTransitionComplete, false);

  clicked.className = "slide slide-active slide-out";
  clickedBtn.className = "slide-button active";
  clicked.addEventListener("animationend", transition, false);

  current = clicked;
  currentBtn = clickedBtn;

  if(current.nextSibling != null){
    current.nextSibling.className = "slide slide-active slide-in";
  } else {
    slides[0].className = "slide slide-active slide-in";
  }

};
