// make the computer pick one of the rock paper or scissors
//
// have user make a choice between r p s
// compare the choices
// display the winner for the round
// add to the winner's score and proceed to the next round and increment round counter
//if the round counter hits max then terminate the game or terminate it if either of player scores more than half the points(there can only be one obvious winner at this point)
//display the winner after termination and give the user option to restart the game

let playerScore = 0;
let computerScore = 0;
let resetbool = false;
//let playerDivArray = document.querySelectorAll(".tool");
let playerSelection;
let gameLoopCounter = 0;
let containerDiv = document.querySelector("#container");
let playerScoreDiv;
let computerScoreDiv;
let resultDiv;
let rockBtn = document.querySelector("#rock-but");
let paperBtn = document.querySelector("#paper-but");
let scissorsBtn = document.querySelector("#scissors-but");
let rowDiv =  document.querySelector("#row-div");
let body = document.body;

function windowListenFunc(e) {
  if (isGameOver()) {
    
    containerDiv.appendChild(resultDiv);
    resetbool = false;
  }
  if (isGameOver() && resetbool === false) {
    window.removeEventListener("click", windowListenFunc);
    resetGame();
    console.log(isGameOver());
    resetbool = true;
  }
}
function startGame(onClick) {
  playerScoreDiv = document.createElement('div');
  computerScoreDiv = document.createElement('div');
  
  containerDiv.appendChild(playerScoreDiv);
  containerDiv.appendChild(computerScoreDiv);
  rockBtn.addEventListener("click", onClick);
  paperBtn.addEventListener("click", onClick);
  scissorsBtn.addEventListener("click", onClick);
  window.addEventListener("click", windowListenFunc);
}

function onClick(e) {
  playerSelection = this.getAttribute("data-value");
  if (isGameOver() !== true) {
    gameLoop(playerSelection);
  } else {
    rockBtn.removeEventListener("click", onClick);
    paperBtn.removeEventListener("click", onClick);
    scissorsBtn.removeEventListener("click", onClick);
    rockBtn.setAttribute("style", "background-color:cyan");
    paperBtn.setAttribute("style", "background-color:cyan");
    scissorsBtn.setAttribute("style", "background-color:cyan");
    return "Game Over!";
  }
}

startGame(onClick);

function resetGame() {
  
  restartButton = document.createElement("button");
  restartButton.textContent = "Restart";
  //restartButton.classList.add('tool');
  restartButton.setAttribute(
    "style",
    "display:flex;background-color:#B2FF59;color:black; width:70px; height:70px;justify-content:center;align-items:center;font-size:25px;padding:20px 50px"
  );
  containerDiv.appendChild(restartButton);
  console.log("resetting");
  restartButton.addEventListener("click", restartGame);
}

 

function randomGenerator(num1, num2 = 0) {
  return Math.floor(Math.random() * (num1 - num2));
}

// Choice maker for the computer
function computerPlay() {
  let randomNumber = randomGenerator(3);
  let choiceArray = ["rock", "paper", "scissors"];
  let choice = choiceArray[randomNumber];
  return choice;
}

function playRound(playerSelection, computerSelection) {
  return decideWinner(playerSelection, computerSelection);
}

// Compare the choices and declare winner for the specific round
function decideWinner(playerChoice, computerChoice) {
  if (playerChoice === "rock") {
    switch (computerChoice) {
      case "rock":
        break;
      //return "It's a tie";
      case "paper":
        computerScore++;
        break;
      //return "Computer wins";
      case "scissors":
        playerScore++;
        break;
      // return "You win";
    }
  } else if (playerChoice === "paper") {
    switch (computerChoice) {
      case "rock":
        playerScore++;
        break;
      //return "You win";
      case "paper":
        break;
      //return "It's a tie";
      case "scissors":
        computerScore++;
        break;
      //return "Computer wins";
    }
  } else {
    switch (computerChoice) {
      case "rock":
        computerScore++;
        break;
      //return "Computer wins";
      case "paper":
        playerScore++;
        break;
      //return "You win";
      case "scissors":
        break;
      //return "It's a tie";
    }
  }
}

function restartGame(e) {
  playerScore = 0;
  computerScore = 0;
  gameLoopCounter = 0;
  if (e) {
    console.log("rendering");
    console.log(this);
    console.log("rbc");
    //containerDiv.removeChild(rowDiv);
    containerDiv.removeChild(restartButton);
    containerDiv.removeChild(playerScoreDiv);
    containerDiv.removeChild(computerScoreDiv);
    containerDiv.removeChild(resultDiv);
    rockBtn.setAttribute("style", "");
    paperBtn.setAttribute("style", "");
    scissorsBtn.setAttribute("style", "");
    startGame(onClick);
  }
}

//Event loop for the entire game
function gameLoop(playerSelection) {
  ++gameLoopCounter;

  playerSelection = playerSelection;

  let computerSelection = computerPlay();
  
  console.log("Player selection : " + playerSelection);
  console.log("Computer selection: " + computerSelection);

  playRound(playerSelection, computerSelection);
  playerScoreDiv.textContent = `Your score : ${playerScore}`;
  computerScoreDiv.textContent = `Computer score: ${computerScore} `;

  console.log("playerscore :" + playerScore);
  console.log("computerscore:" + computerScore);
  console.log("----Round over----");

  if (isGameOver()) {
    resultDiv = document.createElement('div');
    if (playerScore > computerScore) {
      resultDiv.textContent = "Grats! You won.";
      console.log("Grats! You won.");
    } else if (playerScore < computerScore) {
      resultDiv.textContent = "Bow down to the Machine Overlord!"
      console.log("Machine Overlord");
    } else { 
      resultDiv.textContent = "Game Tied"
      console.log("Game tied!");
    }

    return;
  }
}
function isGameOver() {
  if (
    gameLoopCounter >= 8 ||
    playerScore >= Math.floor(8 / 2) + 1 ||
    computerScore >= Math.floor(8 / 2) + 1
  ) {
    return true;
  }
}
