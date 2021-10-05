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

function randomGenerator(num1, num2 = 0) {
  return Math.floor(Math.random() * (num1 - num2));
}

function computerPlay() {
  let randomNumber = randomGenerator(3);
  let choiceArray = ["rock", "paper", "scissors"];
  let choice = choiceArray[randomNumber];
  //console.log(choice);
  return choice;
}

function playRound(playerSelection, computerSelection) {
  // alert(playerSelection);

  return decideWinner(playerSelection, computerSelection);
}

function errorCheck(playerSelection) {
  if (
    playerSelection !== "rock" &&
    playerSelection !== "paper" &&
    playerSelection !== "scissors"
  ) {
    return true;
  } else return false;
}

function decideWinner(playerChoice, computerChoice) {
  if (playerChoice === "rock") {
    switch (computerChoice) {
      case "rock":
        return "It's a tie";
      case "paper":
        computerScore++;
        return "Computer wins";
      case "scissors":
        playerScore++;
        return "You win";
    }
  } else if (playerChoice === "paper") {
    switch (computerChoice) {
      case "rock":
        playerScore++;
        return "You win";
      case "paper":
        return "It's a tie";
      case "scissors":
        computerScore++;
        return "Computer wins";
    }
  } else {
    switch (computerChoice) {
      case "rock":
        computerScore++;
        return "Computer wins";
      case "paper":
        playerScore++;
        return "You win";
      case "scissors":
        return "It's a tie";
    }
  }
}

function restartGame() {
  playerScore = 0;
  computerScore = 0;
  gameLoop();
}

function gameLoop() {
  for (let i = 0; i < 5; i++) {
    let playerSelection = prompt("Enter your choice :").toLowerCase();
    while (1) {
      if (errorCheck(playerSelection)) {
        alert("enter the correct value among rock paper and scissors");
        playerSelection = prompt("Enter your choice :").toLowerCase();
      } else {
        break;
      }
    }
    let computerSelection = computerPlay();
    console.log("Player selection : " + playerSelection);
    console.log("Computer selection:" + computerSelection);

    console.log(playRound(playerSelection, computerSelection));
    console.log("playerscore :" + playerScore);
    console.log("computerscore:" + computerScore);
  }

  if (playerScore > computerScore) {
    alert("Grats! You won.");
  } else if (playerScore < computerScore) {
    alert("Computer wins");
  } else {
    alert("Game tied!");
  }
  let restartChoice = prompt(
    "Do you want to restart ? type (yes/no):"
  ).toLowerCase();
  if (restartChoice == "yes") {
    restartGame();
  }
}

gameLoop();
