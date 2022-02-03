"use strict"

/**imports multiple functions from newPage.js */
import { newPage, divTest } from "./newPage";

/**create an element where i will append other */
const container = document.getElementById("container");

/**i create a new div, then i get the text content from the text funtion on another file, called newPage, whcih simply gives back a string */
const newdiv = document.createElement("div");
newdiv.textContent = newPage();


/**append to container with a fucntion that creates a div and appends a custom text */
container.appendChild(divTest("div", "test div from newPage text"));
container.appendChild(newdiv);
container.appendChild(divTest("div", "second div"))


console.log("works")