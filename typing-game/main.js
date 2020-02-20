window.addEventListener("load", init);

//availble levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 2
};

const currentLevel = levels.easy;
//Globals
let time = currentLevel;
let score = 0;
let isPlaying;

//dom elements
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const secounds = document.querySelector("#seconds");

const words = [
  "bapaku",
  "mamaku",
  "ngoding",
  "blablaabl",
  "akulagimakan",
  "papahi",
  "pipiiip",
  "javascript",
  "python",
  "reactjs",
  "nodejs",
  "express",
  "visualstudiocode",
  "siberlabs",
  "sukatoro"
];

//init a game
function init() {
  //show number of secound in ui
  secounds.innerHTML = currentLevel;
  //load word from array
  showWord(words);
  //start matching on word input
  wordInput.addEventListener("input", startMatch);
  //call countdown every second
  setInterval(countdown, 1000);
  //check status
  setInterval(checkStatus, 50);
}

//start match
function startMatch() {
  if (matchWord()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = "";
    score++;
  }

  //cek negatif 1
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

//match current word to input word
function matchWord() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = "correct!!";
    return true;
  } else {
    message.innerHTML = "";
    return false;
  }
}
//pick and show random word
function showWord(words) {
  //generate array from index
  const randIndex = Math.floor(Math.random() * words.length);
  //output random word
  currentWord.innerHTML = words[randIndex];
}

//countdown timer
function countdown() {
  //make sure time is not run out
  if (time > 0) {
    //decrement
    time--;
  } else if (time === 0) {
    //game is over
    isPlaying = false;
  }
  timeDisplay.innerHTML = time;
}
function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = "Game Over !!";
    score = -1;
  }
}
