function createGrid(x) {
    let divs = "";
    for (let i = 0; i < x; i++) {
        divs += '<div class = "row">'
        for (let j = 0; j < x; j++) {
            divs += `<div class = "cell"></div>`
        }
        divs += "</div>"
    }
    container.innerHTML = divs;
    //WORKS: but manipulates the string and innerHTML. needs to be implemented with createElement and appendChild as it would be a better exercise
}

//createGrid(16);

function createGridX() {
    const container = document.getElementById("container");
    let div = document.createElement("div");
    container.appendChild(div).className = "cell";
    //WORKS; create one div element for now, rest of the logic can be implemented later
}

createGridX();