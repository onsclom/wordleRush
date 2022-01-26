//@ts-check

const keyboardDiv = document.getElementById("keyboard");

function keyboardButtonPressed(letter) {
  console.log(`${letter} was pressed`);
}

function makeKeyboard() {
  const keyboardRows = ["QWERTYUIOP", "ASDFGHJKL", "!ZXCVBNM!"];

  let specialCount = 0;
  for (let row of keyboardRows) {
    let rowDiv = document.createElement("div");
    rowDiv.classList.add("keyboardRow");

    for (let letter of row) {
      let keyboardButton = document.createElement("div");
      keyboardButton.classList.add("keyboardButton", "clickable");

      if (letter == "!") {
        letter = "BACK";
        if (specialCount) letter = "ENTER";
        specialCount += 1;
        keyboardButton.classList.add("keyboardButton");
        keyboardButton.classList.add("specialKeyboardButton");
      }

      keyboardButton.innerHTML = letter;
      keyboardButton.id = letter;
      keyboardButton.onclick = () => {
        keyboardButtonPressed(letter);
      };
      rowDiv.appendChild(keyboardButton);
    }

    keyboardDiv.appendChild(rowDiv);
  }
}

const gridDiv = document.getElementById("grid");

function makeGrid() {
  const rows = 6;
  const wordSize = 5;

  for (let i = 0; i < rows; i++) {
    let rowDiv = document.createElement("div");
    rowDiv.classList.add("gridRow");
    for (let j = 0; j < wordSize; j++) {
      let rowSquare = document.createElement("div");
      rowSquare.classList.add("rowSquare");
      rowSquare.id = `${i},${j}`
      rowDiv.appendChild(rowSquare);
    }
    gridDiv.appendChild(rowDiv);
  }
}

/*
Hook up click events
*/

const instructions = document.getElementById("instructions");
const instructionButton = document.getElementById("?");

instructions.onclick = () => {
  instructions.classList.toggle("hide");
}

instructionButton.onclick = () => {
  instructions.classList.toggle("hide");
}

/*
Dynamically resize text grid
*/

const grid = document.getElementById("grid")
grid.style.width = Math.min( grid.parentElement.clientWidth, grid.parentElement.clientHeight ).toString()+"px"
grid.style.height = Math.min( grid.parentElement.clientWidth, grid.parentElement.clientHeight ).toString()+"px"
window.onresize = () => {
  grid.style.display = "none"
  grid.style.width = Math.min( grid.parentElement.clientWidth, grid.parentElement.clientHeight ).toString()+"px"
  grid.style.height = Math.min( grid.parentElement.clientWidth, grid.parentElement.clientHeight ).toString()+"px"
  grid.style.display = "flex"
}

makeKeyboard();
makeGrid();