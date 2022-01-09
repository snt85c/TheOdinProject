let pSelection = undefined;

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
    document.getElementById("result").textContent = "";
    console.log("GAME START");
    let cSelection = computerPlay();
    checkWinner(pSelection, cSelection);
    console.log("GAME OVER");
}

function checkWinner(pSelection, cSelection) {
    /*manually compares all states and outputs a message*/
    let result = document.getElementById("result");
    if (pSelection == cSelection) result.textContent = "TIE";
    if (pSelection == "Paper" && cSelection == "Rock") result.textContent = "WIN: Paper beats Rock";
    if (pSelection == "Rock" && cSelection == "Scissor") result.textContent = "WIN: Rock beats Scissor";
    if (pSelection == "Scissor" && cSelection == "Paper") result.textContent = "WIN: Scissor beats Paper";
    if (cSelection == "Paper" && pSelection == "Rock") result.textContent = "LOSE: Paper beats Rock";
    if (cSelection == "Rock" && pSelection == "Scissor") result.textContent = "LOSE: Rock beats Scissor";
    if (cSelection == "Scissor" && pSelection == "Paper") result.textContent = "LOSE: Scissor beats Paper";
}

function computerPlay() {
    /** contains an array with the possible selections, a random choice will select one of it and return it back */
    const selections = ["Rock", "Paper", "Scissor"];
    let result = selections[Math.floor(Math.random() * 3)];
    console.log(result);
    return result;
}