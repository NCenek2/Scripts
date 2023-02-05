// Button Array to represent 0-3
let buttonLength = $(".btn").length;
const buttonArray = ["red", "green", "blue", "yellow"];

// Global Variables
let currentLevel = 1;
let counter = 0;
let gameChoices = new Queue();
let userChoices = new Queue();
let userPlaying;

function myLoop() {
  setTimeout(function () {
    // Controls Game Pick
    const randomNumber = buttonArray[Math.floor(Math.random() * buttonLength)];
    handleOpacity(randomNumber);

    // Push the value into the game queue
    gameChoices.enqueue(randomNumber);

    // Increase counter to keep track of game clicks on level
    counter++;
    if (counter < currentLevel) {
      myLoop();
    } else {
      // Allows user to Click on Buttons After Test
      userPlaying = true;
    }
  }, 1000);
}

function handleOpacity(id) {
  $(`#${id}`)
    .animate({ opacity: "25%" }, 200)
    .animate({ opacity: "100%" }, 200);
}

function compareChoices(levelQueue, userQueue) {
  if (levelQueue.dequeue() != userQueue.dequeue()) {
    return false;
  }
  return true;
}

function resetLevelVariables() {
  counter = 0;
  gameChoices.clear();
  userChoices.clear();
}

function handleLevelChange(level, text) {
  const delay = text == "Try Again!" ? 2000 : 750;

  $("h1").text(`${text}`);
  resetLevelVariables();
  setTimeout(() => {
    $("h1").text(`Level ${level}`);
    myLoop();
  }, delay);
  userPlaying = false;
}

// Handle Opacity Change
$(".btn").click(function (event) {
  if (userPlaying) {
    // Local Variables
    let text = "";
    const lossText = "Try Again!";

    // Push to User Choices on Clicks
    handleOpacity(event.target.id);
    userChoices.enqueue(`${event.target.id}`);

    // Handles Last Check Before Level Change
    if (gameChoices.length == 1 && userChoices.length == 1) {
      if (compareChoices(gameChoices, userChoices)) {
        currentLevel++;
        text = `Level ${currentLevel}`;
        handleLevelChange(currentLevel, text);
      } else {
        currentLevel = 1;
        handleLevelChange(currentLevel, lossText);
        // Handle Loss
      }
    } else {
      // Handles Incremental User Clicks
      if (!compareChoices(gameChoices, userChoices)) {
        currentLevel = 1;
        handleLevelChange(currentLevel, lossText);
      }
    }
  }
});

myLoop();
