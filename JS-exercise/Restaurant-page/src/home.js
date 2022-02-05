"use strict"

function homePage() {
    console.log("homepage")
    const content = document.getElementById("content")
    const homeContent = document.createElement("div");
    homeContent.setAttribute("id", "content");
    content.replaceWith(homeContent);

    const h1 = document.createElement("h1");
    h1.textContent = "Welcome to the Wave Café";
    homeContent.appendChild(h1);


    const image = document.createElement("img");
    image.setAttribute("id", "homeImage");
    image.src = "img/2.jpg"
    homeContent.appendChild(image);

}

export default homePage;