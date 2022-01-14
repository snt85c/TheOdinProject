const container = document.getElementById("container");
const btnBlack = document.getElementById("black");
const btnClear = document.getElementById("clear");
const btnRandom = document.getElementById("random");
const btnEraser = document.getElementById("eraser");

let brushColor = "black"; /**default color */
let defaultSize = 16;

btnClear.addEventListener("click", clear);/**on click it will execute the clear method*/
btnBlack.addEventListener("click", () => { brushColor = "black" });/**on click, it will change the value of the variable to "black"*/
btnRandom.addEventListener("click", () => { brushColor = "rainbow" });/**on click, it will change the value of the variable to "rainbow"*/
btnEraser.addEventListener("click", () => { brushColor = "eraser" });/**on click, it will change the value of the variable to "eraser"*/
/**EXPLANATION: each button change the string value of brushColor, this will be used in the colors() method in a switch case to select the color */

function createGrid(defaultSize) {
    /**TODO: change the size of the grid without changing the size of the page, by reducing the size of the cells */
    for (let j = 0; j < defaultSize; j++) {
        let row = document.createElement("div");
        row.classList.add("row"); //adds css class for formatting"row"
        for (let i = 0; i < defaultSize; i++) {
            let div = document.createElement("div");
            div.classList.add("cell"); //adds css class for formatting "cell"
            div.addEventListener("mouseover", () => {
                div.style.backgroundColor = colors();
                /**add the event listener on mouseover on each div/cell to activate the method colors() every time the mouse is on it */
            });
            row.appendChild(div);/**append the divs to the row at the end of the inner loop*/
        }
        container.appendChild(row);/**append the row to the container at the end of the outer loop*/
    }
    /**EXPLANATION: the first loop initialize a row by creating a div element, the second loop fills the row with cells/div which it appends to the row (CSS styling of display:inline-block on row puts them on a single horizontal line), final line which is still in the scope of the first loop append the newly created row to the container element */
}

function clear() {
    let divs = document.querySelectorAll(".cell");
    divs.forEach(div => {
        div.style.backgroundColor = "white";
    });
    /**EXPLANATION:cycle to all the divs and change the backgroudnColor style to "white"*/
}

function colors() {
    switch (brushColor) {
        case "rainbow":
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            return `rgb(${r}, ${g}, ${b})`; /**as in return "rgb(000,000,000)" */
        case "black":
            return "black";
        case "eraser":
            return "white";
    }
    /**EXPLANATION: each button change the value of the variable "brushColor" into 3 possible state(raibow, black, eraser). the method in a switch case checks which value is stored in brushColor and return the value for the current usage */
}

createGrid(defaultSize);
