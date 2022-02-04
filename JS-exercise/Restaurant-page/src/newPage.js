"use strict"

import homePage from "./home";
import menuPage from "./menu";
import contactPage from "./contact";

const container = document.getElementById("container");

function pageStructure() {
    console.log("works")
    createHeader();
    createButtons();
    createContent();
}

function createHeader() {
    const header = document.createElement("div");
    header.classList.add("header");
    header.textContent = "Restaurant"
    container.appendChild(header);

}

function createButtons() {
    const btnArea = document.createElement("div");
    btnArea.classList.add("btnArea")

    const btn1 = document.createElement("button")
    btn1.setAttribute("id", "btn1");
    btn1.textContent = "HOME";
    btnArea.appendChild(btn1)

    const btn2 = document.createElement("button")
    btn2.setAttribute("id", "btn2");
    btn2.textContent = "MENU";
    btnArea.appendChild(btn2)

    const btn3 = document.createElement("button")
    btn3.setAttribute("id", "btn3");
    btn3.textContent = "CONTACT";
    btnArea.appendChild(btn3)

    container.appendChild(btnArea)

}

function createContent() {
    const content = document.createElement("div")
    content.setAttribute("id", "content");
    content.textContent = "content box";
    container.appendChild(content);

    document.addEventListener("click", (e) => {
        if (e.target.id == "btn1") homePage();
        if (e.target.id == "btn2") menuPage();
        if (e.target.id == "btn3") contactPage(content);
    });

    // function contactPage() {
    //     console.log("contactpage")

    //     const googleMap = document.createElement("div");
    //     googleMap.setAttribute("id", "googleMap");
    //     // googleMap.style.width = "100%";
    //     // googleMap.style.height = "400px";
    //     googleMap.textContent = "contact";
    //     content.appendChild(googleMap)

    // }
}


export { pageStructure };