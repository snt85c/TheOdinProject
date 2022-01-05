function game() {
    /*main point of entry for the game.loops 5 times the game. stores the values of the player slection and computer selection in 2 variables and then compares them in the checkwinner function.*/
    console.log("GAME START");
    for (let i = 0; i < 5; i++) {
        var pSelection = playerPlay();
        var cSelection = computerPlay();
        checkWinner(pSelection, cSelection);
    }
    console.log("GAME OVER");
}

function checkWinner(pSelection, cSelection) {
    /*manually compares all states and outputs a message*/
    if (pSelection == cSelection) console.log("TIE");
    if (pSelection == "Paper" && cSelection == "Rock") console.log("WIN: Paper beats Rock");
    if (pSelection == "Rock" && cSelection == "Scissor") console.log("WIN: Rock beats Scissor");
    if (pSelection == "Scissor" && cSelection == "Paper") console.log("WIN: Scissor beats paper");
    if (cSelection == "Paper" && pSelection == "Rock") console.log("LOSE: Paper beats Rock");
    if (cSelection == "Rock" && pSelection == "Scissor") console.log("LOSE: Rock beats Scissor");
    if (cSelection == "Scissor" && pSelection == "Paper") console.log("LOSE: Scissor beats paper");
}

function playerPlay() {
    /** loops until the player writes the right word, no matter the capitalization as it will modify the inputs. return the player's input*/
    while (true) {
        let selection = prompt("Select Paper/Rock/Scissor");
        selection = selection[0].toUpperCase() + selection.substring(1).toLowerCase();
        if (selection == "Rock" || selection == "Paper" || selection == "Scissor") {
            console.log(selection);
            return selection;
        }
    }

}

function computerPlay() {
    /** contains an array with the possible selections, a random choice will select one of it and return it back */
    const selections = ["Rock", "Paper", "Scissor"];
    let result = selections[Math.floor(Math.random() * 3)];
    console.log(result);
    return result;
}