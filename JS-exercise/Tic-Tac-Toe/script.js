/**EXPLANATION: i create two object, on that deals with the board and one for the methods for the player. i initialize the two object (dont need to initialize two players at this stage, as the logic for the AI is random) and then i pass the object and his methods ti the method that starts the game (mouseSelection) */

/**includes methods to deal with the board */
const Board = () => {

    const boardArray = [];

    const rows = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
    ]
    const column = [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
    ]
    const diagonal = [
        [0, 4, 8],
        [2, 4, 6]
    ]

    const difficulty = () => {
        const selectDifficulty = document.getElementById("difficulty");
        return selectDifficulty.value;
    }

    /** populate/reset the screen and the array with empty values, */
    const populateArray = function() {
        for (let i = 0; i < 9; i++) {
            boardArray[i] = document.getElementById(i).textContent = "";
        }
        updateContainer();
        console.table(boardArray);
    }

    /**refresh the container on screen with values from the array */
    const updateContainer = function() {
        for (let i = 0; i < 9; i++) {
            document.getElementById(i).textContent = boardArray[i];
        }
    }

    /**the button activates the funtion populateArray to clear the screen and the values in the array */
    const reset = document.getElementById("reset").addEventListener("click", populateArray);

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
    const checkWin = function(sign) {
        return (checkForColumnWin(sign) || checkForRowWin(sign) || checkForDiagonalWin(sign));
    };

    /**debug only, shows the cell number on screen */
    const numbers = document.getElementById("numbers").addEventListener("click", () => {
        for (let i = 0; i < 9; i++) {
            boardArray[i] = document.getElementById(i).textContent = i;
        }
    });
    return { populateArray, updateContainer, reset, checkWin, boardArray, difficulty, rows, column, diagonal }

}

/**END BOARD OBJECT ----------------------------------------*/

/**Player Object for AI and humand player */
const Player = (sign) => {

    const getSign = () => sign;

    /** add eventListener to document, checks if the target is a cell, its empty and we havent reached endgame , if it is, it adds the sign to the boardArray and updates the container. if this move is not a winnign move, the computer plays his random movement */
    const mouseSelection = (board) => {
        document.addEventListener("click", (e) => {
            if (e.target.textContent == "" && e.target.className == "cell" && !board.checkWin(sign)) {
                board.boardArray[e.target.id] = sign;
                board.updateContainer()
                if (!board.checkWin(sign)) {
                    if (board.difficulty() === "Easy") {
                        ai.easy("O", board)
                    }
                    if (board.difficulty() === "Medium") {
                        console.log("medium selected");
                        ai.medium(sign == "X" ? "O" : "X", board)
                    }
                    if (board.difficulty() === "Impossible") {
                        console.log("impossible selected");
                        ai.hard(sign == "X" ? "O" : "X", board)
                    }
                }
            }
        });

    }

    return { mouseSelection, getSign };
}

const AI = () => {

    /**returns a random nimber between 0 and 8 */
    const random = () => Math.floor(Math.random() * 9);

    /**creates a small delay between the human player selection and the computer selection */
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**has to be kept in a for loop, as a while loop wont break out. does repeated random assignment until it finds an empty spot where it will asssign his sign. updates and checks if is a win condition */
    const easy = async(sign, board) => {
        for (let i = 0; i < 10; i++) { //a while loop wont work!
            let randomLocation = random();
            if (board.boardArray[randomLocation] == "") {
                board.boardArray[randomLocation] = sign;
                await sleep(250);
                console.log("random move")
                board.updateContainer()
                board.checkWin(sign);
                break;
            }
        }
    }

    const checkRowsMediumDifficulty = (sign, board) => {
        let temp = -1;
        for (let i = 0; i < 3; i++) {
            let counter = 0;
            for (let j = 0; j < 3; j++) {
                if (board.boardArray[board.rows[i][j]] == "X") {
                    counter++;
                }
                if (board.boardArray[board.rows[i][j]] == "") {
                    temp = board.rows[i][j]
                }
                if (counter == 2 && temp != -1) {
                    return temp;
                }
            }
            temp = -1;
        }
        return temp;
    }

    const checkColumnsMediumDifficulty = (sign, board) => {
        let temp = -1;
        for (let i = 0; i < 3; i++) {
            let counter = 0;
            for (let j = 0; j < 3; j++) {
                if (board.boardArray[board.column[i][j]] == "X") {
                    counter++;
                }
                if (board.boardArray[board.column[i][j]] == "") {
                    temp = board.column[i][j]
                }
                if (counter == 2 && temp != -1) {
                    return temp;
                }
            }
            temp = -1;
        }
        return temp;
    }


    const medium = async(sign, board) => {
        let columnsValue = checkColumnsMediumDifficulty(sign, board);
        let rowsValue = checkRowsMediumDifficulty(sign, board);
        let temp = -1;
        if (columnsValue != -1) temp = columnsValue;
        if (rowsValue != -1) temp = rowsValue;

        if (temp == -1) {
            easy(sign, board);
        } else {
            board.boardArray[temp] = "O";
            console.log("medium move")
            await sleep(250);
            board.updateContainer()
            board.checkWin(sign);
        }
    }
    const hard = async(sign, board) => {}

    return { easy, medium, hard };
}

/**END PLAYER OBJECT ---------------------------------------- */

const board = Board()
const p1 = Player("X");
const ai = AI();

console.table(board.rows)
console.log(board.rows[0][2])
console.log(board.difficulty())

board.populateArray();
p1.mouseSelection(board, ai);