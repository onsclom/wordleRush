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
  "PLAYING",  "RESULTS"
]


function handlePressedKey(key) {
  // ignore input if not playing
  if (gameInfo.state != "PLAYING" && gameInfo.state != "FIRST_WORD")
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
  console.log(gameInfo)
  const curGuess = gameInfo.curGuess.toLowerCase()
  if ( allowedWords.includes(curGuess) || finalWords.includes(curGuess)) {
    
    addHistory(curGuess)
    
    if (gameInfo.state == "FIRST_WORD") {
      gameInfo.state = "PLAYING"
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

    gameInfo.curMaxGreen = Math.max(greens, gameInfo.curMaxGreen)
    
    // if all green, WIN ROW
    if (greens == 5) {
      // WON 
      // TODO (clear, get new word, etc.)
      greenFlash()
      clearGameState()
      gameInfo.curWordToGuess = getRandomWord(dateString+`${ gameInfo.wordNum}`)
      console.log(gameInfo.curWordToGuess)
      saveGameState()
      return
    }
    
    if (gameInfo.curRow == 5)
    {
      // lost from incorrect guess
      gameInfo.lostCause = "You failed a word!"
      gameInfo.state = "RESULTS"
    }
    
    gameInfo.curGuess=""
    gameInfo.curRow+=1
    saveGameState()
  } else {
    // not a wordle accepted word!
    redFlash()
  }
}

function startGame() {
  console.log("HI")
  document.getElementById("title");
  animationLoop()
}

function animationLoop() {
  if (gameInfo.state == "RESULTS")
    return

  let now = new Date()
  let timeStarted = new Date(gameInfo.timeStarted)
  let secondsRemaining = 5*60-Math.ceil( (/** @type {any} */(now) - gameInfo.timeStarted)/1000 );
  let mins = Math.floor(secondsRemaining/60)
  let secs = (secondsRemaining%60).toString()
  if (secs.length == 1) secs = "0"+secs
  let time = `${mins}:${secs}`
  let points = (gameInfo.wordNum-1)*5+gameInfo.curMaxGreen
  document.getElementById("title").innerHTML = `${time} &nbsp;&nbsp; ${points} pts`

  if (secondsRemaining <= 0) {
    
    gameInfo.state == "RESULTS"
  }

  if (gameInfo.state == "RESULTS")
  {
    showResults()
    return
  }

  window.requestAnimationFrame(animationLoop)
}

makeInstructions();
if (firstTimeOnSite()) showInstructions();

let now = new Date();
let dateString = now.toDateString();

let gameInfo = null;

if (window.localStorage.getItem("gameInfo") )
  gameInfo = JSON.parse( window.localStorage.getItem("gameInfo") )
  
makeKeyboard(handlePressedKey);
makeGrid();

// if no gamestate, then load
if (gameInfo != null && gameInfo.gameDate == dateString) {
  loadGameState()
  console.log("nice!")
  console.log(gameInfo)
  if (gameInfo.state=="PLAYING")
    startGame()
} else {
  if (gameInfo == null)
    showInstructions()

  gameInfo = {
    state: "FIRST_WORD",
    wordNum: 1,
    curRow: 0,
    curGuess: "",
    gameDate: dateString,
    curMaxGreen: 0,
    lostCause: "",
    timeStarted: new Date().getTime(),
    history: {
      goalWords: [],
      attempts: []
    },
    curWordToGuess: "",
  }
  gameInfo.curWordToGuess = getRandomWord(gameInfo.gameDate)
}

function greenFlash() {
  document.getElementById('gridHolder').classList.remove("greenFlash", "redFlash")
  void document.getElementById('gridHolder').offsetWidth; // trigger reflow
  document.getElementById('gridHolder').classList.add('greenFlash')
}

function redFlash() {
  document.getElementById('gridHolder').classList.remove("redFlash", "greenFlash")
  void document.getElementById('gridHolder').offsetWidth; // trigger reflow
  document.getElementById('gridHolder').classList.add('redFlash')
}

function getRandomWord(seed) {
  let word = finalWords[Math.floor(seededRandom(seed) * finalWords.length)]
  gameInfo.history.goalWords.push(word)
  return word
}

function clearGameState() {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
      document.getElementById(`${i},${j}`).classList.remove("green", "yellow", "black")
      document.getElementById(`${i},${j}`).innerHTML=""
    }
  }
  gameInfo.curGuess = ""
  gameInfo.curRow = 0
  gameInfo.curMaxGreen = 0
  gameInfo.wordNum += 1
}

function addHistory(guess) {
  if (gameInfo.history.attempts.length < gameInfo.wordNum)
  gameInfo.history.attempts.push([])
  gameInfo.history.attempts[ gameInfo.wordNum-1 ].push(guess) 
}

function loadGameState() {
  if (gameInfo.curRow != 0) {
    //then there exists attempts to fill out
    let curAttempts = gameInfo.history.attempts[gameInfo.history.attempts.length-1]
    for (let i=0; i<curAttempts.length; i++) {
      for (let j=0; j<5; j++) {
        document.getElementById(`${i},${j}`).innerHTML = curAttempts[i][j].toUpperCase()
        if (curAttempts[i][j] == gameInfo.curWordToGuess[j])
          document.getElementById(`${i},${j}`).classList.add("green")
        else if (gameInfo.curWordToGuess.includes(curAttempts[i][j]))
          document.getElementById(`${i},${j}`).classList.add("yellow")
        else 
          document.getElementById(`${i},${j}`).classList.add("black")
      }
    }

  }
}

function saveGameState() {
  window.localStorage.setItem("gameInfo", JSON.stringify(gameInfo))
}

function showResults() {

}