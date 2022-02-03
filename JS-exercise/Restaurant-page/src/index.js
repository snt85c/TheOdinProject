"use strict"

import { newPage, divTest } from "./newPage";

const container = document.getElementById("container");

const newdiv = document.createElement("div");
newdiv.textContent = newPage();

container.appendChild(divTest("div", "test div from newPage text"));
container.appendChild(newdiv);
container.appendChild(divTest("div", "second div"))


console.log("works")