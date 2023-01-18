const buttonArray = ["green", "red", "yellow", "blue"];

let currentLevel = 1;
let i = 0;
let levelArray = [];
let userArray = [];

function myLoop() {
  setTimeout(function () {
    const id = buttonArray[Math.floor(Math.random() * 4)];
    handleOpacity(id);
    levelArray.push(id);
    console.log(levelArray, userArray);
    i++;
    if (i < currentLevel) {
      myLoop();
    }
  }, 1000);
}

myLoop();

function handleOpacity(id) {
  $(`#${id}`).animate({ opacity: "25%" }).animate({ opacity: "100%" });
}

function handleSelections(levelArr, userArr) {
  for (let i = 0; i < levelArr.length; i++) {
    if (levelArr[i] != userArr[i]) {
      return false;
    }
  }

  return true;
}
// Handle Opacity Change
$(".btn").click(function (event) {
  $(`#${event.target.id}`)
    .animate({ opacity: "50%" })
    .animate({ opacity: "100%" });
  userArray.push(`${event.target.id}`);
  if (
    levelArray.length == userArray.length &&
    levelArray.length > 0 &&
    userArray.length > 0
  ) {
    if (handleSelections(levelArray, userArray)) {
      $("h1").text(`Level ${currentLevel + 1}`);
      currentLevel++;
      myLoop(currentLevel);
      i = 0;
      levelArray = [];
      userArray = [];
    } else {
      $("h1").text(`Try Again!`);
      currentLevel = 1;
      i = 0;
      levelArray = [];
      userArray = [];
      setTimeout(() => {
        myLoop(1);
        $("h1").text(`Level ${currentLevel}`);
      }, 3000);
    }
  }
  console.log(levelArray, userArray);
});
