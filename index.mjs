//@ts-check

import {
  makeGrid,
  makeKeyboard,
  makeInstructions,
  firstTimeOnSite,
  showInstructions,
  seededRandom,
  finalWords,
  allowedWords,
} from "./util.mjs";

const gameStates = [
  "LOADING",
  "FIRST_WORD",
  "PLAYING",
  "RESULTS"
]

let state = "LOADING"
let gameInfo = {
  wordNum: 1,
  curRow: 0,
  curGuess: "",
  curWordToGuess: "",
}

function handlePressedKey(key) {
  // ignore input if not playing
  if (state != "PLAYING" && state != "FIRST_WORD")
    return

  if (key == "ENTER") 
  {
    evaluateCurrentWord()
  }
  else if (key == "BACK")
  {
    // backspace
    if (gameInfo.curGuess.length > 0) {
      document.getElementById(`${gameInfo.curRow},${gameInfo.curGuess.length-1}`).innerHTML = ""
      gameInfo.curGuess = gameInfo.curGuess.slice(0, gameInfo.curGuess.length-1)
    }
  }
  else
  {
    // letter
    if (gameInfo.curGuess.length < 5) {
      document.getElementById(`${gameInfo.curRow},${gameInfo.curGuess.length}`).innerHTML = key
      gameInfo.curGuess += key
    }
  }
}

function evaluateCurrentWord() {
  const curGuess = gameInfo.curGuess.toLowerCase()
  if ( allowedWords.includes(curGuess) || finalWords.includes(curGuess)) {
    if (state == "FIRST_WORD") {
      state = "PLAYING"
      startGame()
    }
    // go through each letter and color correctly
    let greens = 0;
    for (let i=0; i<5; i++) {
      let curLetter = curGuess[i];
      if (curLetter == gameInfo.curWordToGuess[i]) {
        // color letter green
        document.getElementById(`${gameInfo.curRow},${i}`).classList.add("green")
        greens += 1;
        continue
      }
      if (gameInfo.curWordToGuess.includes(curLetter)) {
        document.getElementById(`${gameInfo.curRow},${i}`).classList.add("yellow")
      }
      else {
        document.getElementById(`${gameInfo.curRow},${i}`).classList.add("black")
      }
    }

    // if all green, WIN ROW
    if (greens == 5) {
      // WON 
      // TODO (clear, get new word, etc.)
    }

    if (gameInfo.curRow == 5)
    {
      // lost from incorrect guess
      state = "RESULTS"
    } 


    gameInfo.curGuess=""
    gameInfo.curRow+=1
  } else {
    // not a wordle accepted word!
  }
}

function startGame() {

}

makeInstructions();
if (firstTimeOnSite()) showInstructions();

let now = new Date();
let dateString = now.toDateString();

// if already did today's rushle
if (window.localStorage.getItem("lastCompletedDay") == dateString) {
  //then show results
  // show timer till next wrushle
  // allow copy&paste
} else {
  //game time
  makeKeyboard(handlePressedKey);
  makeGrid();

  state = "FIRST_WORD"

  const randWord =
    finalWords[Math.floor(seededRandom(dateString) * finalWords.length)];
  gameInfo.curWordToGuess = randWord
  console.log(randWord)
}

