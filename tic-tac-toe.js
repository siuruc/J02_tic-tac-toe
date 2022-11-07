/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
const prompt = require('prompt-sync')({sigint: true});
const assert = require('assert');
const { start } = require('repl');

// The board object used to save the current status of a gameplay
let board = {
    1: ' ',
    2: ' ',
    3: ' ',
    4: ' ',
    5: ' ',
    6: ' ',
    7: ' ',
    8: ' ',
    9: ' '
};

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
    board[position] = mark
}

// TODO: print the game board as described at the top of this code skeleton
// Will not be tested in Part 1
function printBoard() {
    for (let pos in board){
        if (board[pos] == ' '){
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
    )

}


// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
// position is an input String
function validateMove(position) {
    if(position !== NaN){
       position = Number(position);
    }
    if ((board[position] !== 'X' && board[position] !== 'O') && position > 0 && position < 10){
        return true;
    } else {
        return false;
    }
}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
    for (let i=0; i<winCombinations.length; i++){
        let point = 0;
        for (let j=0; j<winCombinations[i].length; j++){
            if (board[winCombinations[i][j]] === player){
                point++
            }
        }
        if (point === 3){
            return true;
        }
    }
    return false
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
    count = 0
    for (pos in board){
        if (board[pos] === 'X' || board[pos] === 'O'){
            count++
        }
    }
    if(count === 9){
        return true;
    } else {
        return false;
    }
}


// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************


// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc

function playTurn(player) {
    position = prompt('Player ' + player + ', please choose your position: ');
    if (validateMove(position) === true){
        markBoard(position, player);
        printBoard();
        if (checkWin(player) === true){
            console.log("Player " + player + ", YOU WIN!");
            winnerIdentified = true;
            newGame = false;
            return;
        } else if (checkFull() === true){
            console.log("It's a tie.");
            isTie = true;
            newGame = false;
            return;
        } else {
            if (player === 'X'){
                playTurn('O')
            } else {
                playTurn('X')
            }
        }      
    } else {
        console.log("Invalid input. Please choose again.");
        playTurn(player);
    }
}


// entry point of the whole program
// Bonus Point: Implement the feature for the user to restart the game after a tie or game over

let newGame = true
let winnerIdentified = false
let isTie = false
let currentTurnPlayer = 'X'

console.log('Game started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');
    
while (!winnerIdentified && !isTie && newGame === true){
    playTurn(currentTurnPlayer);
    // feel free to add logic here if needed, e.g. announcing winner or tie
}

while (!newGame && (winnerIdentified === true || isTie === true)){
    restartGame = prompt('Do you want to play a new game? (Y/N) ')
    if (restartGame === 'Y'){
        board = {
            1: ' ',
            2: ' ',
            3: ' ',
            4: ' ',
            5: ' ',
            6: ' ',
            7: ' ',
            8: ' ',
            9: ' '
        };
        printBoard();
        if (currentTurnPlayer === 'X'){
            currentTurnPlayer = 'O'
            playTurn(currentTurnPlayer);
        } else {
            currentTurnPlayer = 'X'
            playTurn(currentTurnPlayer);
        }
    } else if (restartGame === 'N'){
        console.log("Bye now.")
        newGame = false
        return;
    } else {
        newGame = false
        winnerIdentified = true
        console.log("Invalid.")
    }
}

