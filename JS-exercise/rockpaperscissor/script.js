//initialize a variable where we will store the player selection
let pSelection = undefined;

//initialise constants for each button where we add an event listener which on click will get the selection of the player and start the game 
const rock = document.getElementById("rock").addEventListener("click", () => {
    pSelection = "Rock";
    game();
});
const paper = document.getElementById("paper").addEventListener("click", () => {
    pSelection = "Paper";
    game();
});
const scissor = document.getElementById("scissor").addEventListener("click", () => {
    pSelection = "Scissor";
    game();
});

function game() {
    //get the selection from the computer, then compare it with the selection from the player
    let cSelection = computerPlay();
    checkWinner(pSelection, cSelection);
}

function checkWinner(pSelection, cSelection) {
    /*manually compares all states and outputs a message in the div*/
    let result = document.getElementById("result");
    if (pSelection == cSelection) result.textContent = "TIE";
    if (pSelection == "Paper" && cSelection == "Rock") result.textContent = "WIN: Paper beats Rock";
    if (pSelection == "Rock" && cSelection == "Scissor") result.textContent = "WIN: Rock beats Scissor";
    if (pSelection == "Scissor" && cSelection == "Paper") result.textContent = "WIN: Scissor beats Paper";
    if (cSelection == "Paper" && pSelection == "Rock") result.textContent = "LOST: Paper beats Rock";
    if (cSelection == "Rock" && pSelection == "Scissor") result.textContent = "LOST: Rock beats Scissor";
    if (cSelection == "Scissor" && pSelection == "Paper") result.textContent = "LOST: Scissor beats Paper";
}

function computerPlay() {
    /** contains an array with the possible selections, a random choice will select one of it and return it back */
    const selections = ["Rock", "Paper", "Scissor"];
    let result = selections[Math.floor(Math.random() * 3)];
    return result;
}