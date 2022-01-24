const boardArray = [];

/** populate/reset the screen and the array with empty values, */
const populateArray = function() {
    for (let i = 0; i < 9; i++) {
        boardArray[i] = document.getElementById(i).textContent = undefined;
    }
}

/**refresh the container on screen with values from the array */
const updateContainer = function() {
    for (let i = 0; i < 9; i++) {
        document.getElementById(i).textContent = boardArray[i];
    }
}

/**the button activates the funtion populateArray to clear the screen and the values in the array */
const reset = document.getElementById("reset").addEventListener("click", populateArray);

/**returns a random nimber between 0 and 8 */
const random = () => Math.floor(Math.random() * 9);

/**debug only, shows the cell number on screen */
const numbers = document.getElementById("numbers").addEventListener("click", () => {
    for (let i = 0; i < 9; i++) {
        boardArray[i] = document.getElementById(i).textContent = i;
    }
});


/**has to be kept in a for loop, as a while loop wont break out. does repeated random assignment until it finds an empty spot where it will asssign his sign. updates and checks if is a win condition */
const randomAssignment = (sign) => {
    for (let i = 0; i < 10; i++) { //a while loop wont work!
        let randomLocation = random();
        if (boardArray[randomLocation] == undefined) {
            boardArray[randomLocation] = sign;
            updateContainer()
            checkWin(sign);
            break;
        }
    }
}

/** add eventListener to document, checks if the target is a cell, its empty and we havent reached endgame , if it is, it adds the sign to the boardArray and updates the container. if this move is not a winnign move, the computer plays his random movement */
const mouseSelection = (sign) => {
    document.addEventListener("click", (e) => {
        if (e.target.textContent == "" && e.target.className == "cell" && !checkWin("X")) {
            boardArray[e.target.id] = sign;
            updateContainer()
            if (!checkWin("X")) {
                randomAssignment("O")
            }
        }
    });
}

/**check 036 or 147 or 258 for column win */
const checkForColumnWin = function(sign) {
    if (boardArray[0] == sign && boardArray[3] == sign && boardArray[6] == sign) {
        console.log("column win")
        return true;
    } else if (boardArray[1] == sign && boardArray[4] == sign && boardArray[7] == sign) {
        console.log("column win")
        return true;
    } else if (boardArray[2] == sign && boardArray[5] == sign && boardArray[8] == sign) {
        console.log("column win")
        return true;
    }
}

/** check 012 or 345 or 678 for row win */
const checkForRowWin = (sign) => {
    if (boardArray[0] == sign && boardArray[1] == sign && boardArray[2] == sign) {
        console.log("row win")
        return true;
    } else if (boardArray[3] == sign && boardArray[4] == sign && boardArray[5] == sign) {
        console.log("row win")
        return true;
    } else if (boardArray[6] == sign && boardArray[7] == sign && boardArray[8] == sign) {
        console.log("column win")
        return true;
    }
}

/**check two sets of cells for diagonal win */
const checkForDiagonalWin = function(sign) {
    if (boardArray[0] == sign && boardArray[4] == sign && boardArray[8] == sign) {
        console.log("diagonal win")
        return true;
    } else if (boardArray[2] == sign && boardArray[4] == sign && boardArray[6] == sign) {
        console.log("diagonal win")
        return true;
    }
}

/** checks 3 method for overall win */
const checkWin = (sign) => (checkForColumnWin(sign) || checkForRowWin(sign) || checkForDiagonalWin(sign));

/**temporary function to store all the fucntions that need to start at the beginning while debuggign and adding more functions */
function debuggingStartFunctions() {
    populateArray()
    updateContainer();
    mouseSelection("X");
}

debuggingStartFunctions()