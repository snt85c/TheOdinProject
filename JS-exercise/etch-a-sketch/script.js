const container = document.getElementById("container");
const btnBlack = document.getElementById("black");
const btnClear = document.getElementById("clear");
const btnRandom = document.getElementById("random");
const btnEraser = document.getElementById("eraser");

let brushColor = "black"; /**default color */
let defaultSize = 16;

btnClear.addEventListener("click", clear);
btnBlack.addEventListener("click", () => { brushColor = "black" });
btnRandom.addEventListener("click", () => { brushColor = "rainbow" });
btnEraser.addEventListener("click", () => { brushColor = "eraser" });
/**EXPLANATION: each button change the string value of brushColor, this will be used in the colors() method in a switch case to select the color */

function createGrid(defaultSize) {
    /**TODO: change the size of the grid without changing the size of the page, by reducing the size of the cells */
    for (let j = 0; j < defaultSize; j++) {
        let row = document.createElement("div");
        row.classList.add("row"); //adds css class "row"
        for (let i = 0; i < defaultSize; i++) {
            let div = document.createElement("div");
            div.classList.add("cell"); //adds css class "cell"
            row.appendChild(div);
        }
        container.appendChild(row);
    }
    /**EXPLANATION: the first loop initialize a row by creating a div element, the second loop fills the row with cells/div which it appends to the row (CSS styling of display:inline-block on row puts them on a single horizontal line), final line which is still in the scope of the first loop append the newly created row to the container element */
}

function hover() {
    let divs = document.querySelectorAll(".cell");
    divs.forEach(div => {
        div.addEventListener("mouseover", () => {
            div.style.backgroundColor = colors();
        });
    });
    /**EXPLANATION: i attach an event listener that chenge the color of the div when the mouse is on it. i select all the queries of the class "cell", i cycle via a forEach loop and i add the event listener that change the color, which is selected by the method colors()  */
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
            const randomR = Math.floor(Math.random() * 256);
            const randomG = Math.floor(Math.random() * 256);
            const randomB = Math.floor(Math.random() * 256);
            return `rgb(${randomR}, ${randomG}, ${randomB})`;
        case "black":
            return "black";
        case "eraser":
            return "white";
    }
    /**EXPLANATION: each button change the value of the variable "brushColor" into 3 possible state(raibow, black, eraser). the method in a switch case checks which value is stored in brushColor and return the value for the current usage */
}

// function createGrid(x) {
//     let divs = "";
//     for (let i = 0; i < x; i++) {
//         divs += '<div class = "row">'
//         for (let j = 0; j < x; j++) {
//             divs += `<div class = "cell"></div>`
//         }
//         divs += "</div>"
//     }
//     container.innerHTML = divs;
//     //WORKS: but manipulates the string and uses innerHTML. needs to be implemented with createElement and appendChild as it would be a better exercise
// }

createGrid(defaultSize);
hover();