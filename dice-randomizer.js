// Generates a random number from 1 to 6
function randomNumber() {
  return Math.floor(Math.random() * 6) + 1;
}

// Takes the player number and returns a new class name
function handleDie(number) {
  const numberStrings = ["one", "two", "three", "four", "five", "six"];
  const numberString = numberStrings[number - 1];
  const newClass = `.die-${numberString}`;
  return newClass;
}

// Takes the die number and returns the corresponding inner HTML
function handleDot(number) {
  const numberStrings = ["one", "two", "three", "four", "five", "six"];
  const numberString = numberStrings[number - 1];
  let newHTML = "";
  for (let i = 0; i < number; i++) {
    newHTML += `<div class="dot-${numberString}"></div>`;
  }
  return newHTML;
}
// Handles the winner of the roll of die
function handleWinner(number1, number2) {
  let titleString = "";
  if (number1 > number2) {
    titleString = "🚩 Player 1 Wins!";
  } else if (number2 > number1) {
    titleString = "🚩 Player 2 Wins!";
  } else {
    titleString = "🚩 Draw!";
  }
  return titleString;
}

function handleReset() {
  location.reload();
}

// Taking new classes and new HTML and implementing into DOM
const player1Number = randomNumber();
const player2Number = randomNumber();
document.querySelector(".player1-die").classList.add(handleDie(player1Number));
document.querySelector(".player1-die").innerHTML = handleDot(player1Number);
document.querySelector(".player2-die").classList.add(handleDie(player2Number));
document.querySelector(".player2-die").innerHTML = handleDot(player2Number);

// Implementing Winner Text into DOM
const headerText = (document.querySelector(".header").textContent =
  handleWinner(player1Number, player2Number));

// Handling Reset to Roll Die Again
const dieButton = document.querySelector(".dice-btn");
dieButton.addEventListener("click", handleReset);
dieButton.removeEventListener("click", handleReset);
