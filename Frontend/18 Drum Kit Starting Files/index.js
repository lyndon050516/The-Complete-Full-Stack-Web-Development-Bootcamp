document.querySelectorAll(".drum").forEach((button) => {
  button.addEventListener("click", function () {
    let btn = this.innerHTML;
    makeSound(btn);
    buttonAnimation(this);
  });
});

function makeSound(btnInnerHTML) {
  let audio;
  switch (btnInnerHTML) {
    case "w":
      audio = new Audio("sounds/tom-1.mp3");
      audio.play();
      break;
    case "a":
      audio = new Audio("sounds/tom-2.mp3");
      audio.play();
      break;
    case "s":
      audio = new Audio("sounds/tom-3.mp3");
      audio.play();
      break;
    case "d":
      audio = new Audio("sounds/tom-4.mp3");
      audio.play();
      break;
    case "j":
      audio = new Audio("sounds/snare.mp3");
      audio.play();
      break;
    case "k":
      audio = new Audio("sounds/crash.mp3");
      audio.play();
      break;
    case "l":
      audio = new Audio("sounds/kick-bass.mp3");
      audio.play();
      break;
    default:
      console.log(btnInnerHTML);
  }
}

function buttonAnimation(element) {
  element.classList.add("pressed");
  setTimeout(() => {
    element.classList.remove("pressed");
  }, 100);
}

document.addEventListener("keydown", function (event) {
  if (event.key.match(/[w,a,s,d,j,k,l]/)) {
    makeSound(event.key.toLowerCase());
    buttonAnimation(document.querySelector("." + event.key.toLowerCase()));
  }
});
