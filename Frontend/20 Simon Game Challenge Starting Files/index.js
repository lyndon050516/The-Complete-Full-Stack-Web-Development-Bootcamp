let randomPattern = [];
let userClickedPattern = [];
let gameStarted = false;
let level = 0;

$(document).keypress(function () {
  if (!gameStarted) {
    gameStarted = true;
    nextSequence();
  }
});

$(".btn").click(function () {
  let userColor = $(this).attr("id");
  userClickedPattern.push(userColor);
  animatePress(userColor);
  playSound(userColor);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomColor = ["green", "red", "yellow", "blue"][randomNumber];
  randomPattern.push(randomColor);
  $("#" + randomColor)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomColor);
  level++;
  $("#level-title").text("Level " + level);
  userClickedPattern = [];
}

function playSound(color) {
  if (color === "wrong") {
    let audio = new Audio("sounds/wrong.mp3");
    audio.play();
  } else {
    let audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
  }
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 50);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === randomPattern[currentLevel]) {
    if (userClickedPattern.length === randomPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
    return;
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver() {
  level = 0;
  gameStarted = false;
  randomPattern = [];
  userClickedPattern = [];
}
