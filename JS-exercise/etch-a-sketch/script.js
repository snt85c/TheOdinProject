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

//createGrid(16);

const container = document.getElementById("container");
const black = document.getElementById("black");
const clear = document.getElementById("clear");
const random = document.getElementById("random");
clear.addEventListener("click", btnClear);
let defautColor = "red";
let defaultSize = 16;

function createGrid(defaultSize) {
    /**const container = document.getElementById("container");
    let div = document.createElement("div");
    container.appendChild(div).className = "cell";*/
    //TEST; create one div element for now, rest of the logic can be implemented later

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

function hover(color) {
    let divs = document.querySelectorAll(".cell");
    divs.forEach(div => {
        div.addEventListener("mouseover", () => {
            div.style.backgroundColor = color;
        });
    });
    /**EXPLANATION: i need to attach an evnt listener that chenge the color of the div when the mouse is on it. i select all the queries of the class "cell", i cycle via a froEach loop and i add the vent listener that change the color */
}

function btnClear() {
    let divs = document.querySelectorAll(".cell");
    divs.forEach(div => {
        div.style.backgroundColor = "white";
    });

    /**EXPLANATION:cycle to all the divs and change the backgroudnColor style to "white"*/
}
createGrid(defaultSize);
hover(defautColor);