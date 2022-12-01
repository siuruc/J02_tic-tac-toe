/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
const prompt = require("prompt-sync")({ sigint: true });
const assert = require("assert");
const { start } = require("repl");

// The board object used to save the current status of a gameplay
let board = {
  1: " ",
  2: " ",
  3: " ",
  4: " ",
  5: " ",
  6: " ",
  7: " ",
  8: " ",
  9: " ",
};

// Update the gameboard with the user input
function markBoard(position, mark) {
  board[position] = mark;
}

// Print the game board as described at the top of this code skeleton
function printBoard() {
  for (let pos in board) {
    if (board[pos] == " ") {
      board[pos] = pos;
    } else {
      board[pos];
    }
  }
  console.log(
    `

${board[1]} | ${board[2]} | ${board[3]}
--------- 
${board[4]} | ${board[5]} | ${board[6]}
--------- 
${board[7]} | ${board[8]} | ${board[9]}

`
  );
}

// Check for wrong input, this function should return true or false.
function validateMove(position) {
  if (position !== NaN) {
    position = Number(position);
  }
  if (
    board[position] !== "X" &&
    board[position] !== "O" &&
    position > 0 &&
    position < 10
  ) {
    return true;
  } else {
    return false;
  }
}

// List out all the combinations of winning
let winCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

// Implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
  for (let i = 0; i < winCombinations.length; i++) {
    let point = 0;
    for (let j = 0; j < winCombinations[i].length; j++) {
      if (board[winCombinations[i][j]] === player) {
        point++;
      }
    }
    if (point === 3) {
      return true;
    }
  }
  return false;
}

// Implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
  count = 0;
  for (pos in board) {
    if (board[pos] === "X" || board[pos] === "O") {
      count++;
    }
  }
  if (count === 9) {
    return true;
  } else {
    return false;
  }
}

// The main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc

function playTurn(player) {
  position = prompt("Player " + player + ", please choose your position: ");
  if (validateMove(position) === true) {
    markBoard(position, player);
    printBoard();
    if (checkWin(player) === true) {
      console.log("Player " + player + ", YOU WIN!");
      winnerIdentified = true;
      newGame = false;
      return;
    } else if (checkFull() === true) {
      console.log("It's a tie.");
      isTie = true;
      newGame = false;
      return;
    } else {
      if (player === "X") {
        playTurn("O");
      } else {
        playTurn("X");
      }
    }
  } else {
    console.log("Invalid input. Please choose again.");
    playTurn(player);
  }
}

// entry point of the whole program

let newGame = true;
let winnerIdentified = false;
let isTie = false;
let currentTurnPlayer = "X";

console.log(
  "Game started: \n\n" +
    " 1 | 2 | 3 \n" +
    " --------- \n" +
    " 4 | 5 | 6 \n" +
    " --------- \n" +
    " 7 | 8 | 9 \n"
);

while (!winnerIdentified && !isTie && newGame === true) {
  playTurn(currentTurnPlayer);
}

while (!newGame && (winnerIdentified === true || isTie === true)) {
  restartGame = prompt("Do you want to play a new game? (Y/N) ");
  if (restartGame === "Y") {
    board = {
      1: " ",
      2: " ",
      3: " ",
      4: " ",
      5: " ",
      6: " ",
      7: " ",
      8: " ",
      9: " ",
    };
    printBoard();
    if (currentTurnPlayer === "X") {
      currentTurnPlayer = "O";
      playTurn(currentTurnPlayer);
    } else {
      currentTurnPlayer = "X";
      playTurn(currentTurnPlayer);
    }
  } else if (restartGame === "N") {
    console.log("Bye now.");
    newGame = false;
    return;
  } else {
    newGame = false;
    winnerIdentified = true;
    console.log("Invalid.");
  }
}
