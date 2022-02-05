"use strict"


/**import all the functions from different files */
import homePage from "./home";
import menuPage from "./menu";
import contactPage from "./contact";

const container = document.getElementById("container");

/**entry function to create a page, by adding an header, the button nav, the content area and a footer */
function pageStructure() {
    console.log("works")
    createHeader();
    createButtons();
    createContent();
    createFooter();

    /**adds elements for the header */
    function createHeader() {
        const header = document.createElement("div");
        header.classList.add("header");
        header.textContent = "Wave Café"
        container.appendChild(header);
    }

    /**adds elements for the buttons in the button nav area */
    function createButtons() {
        const btnArea = document.createElement("div");
        btnArea.classList.add("btnArea")

        const btn1 = document.createElement("button")
        btn1.setAttribute("id", "btn1");
        btn1.textContent = "Home";
        btnArea.appendChild(btn1)

        const btn2 = document.createElement("button")
        btn2.setAttribute("id", "btn2");
        btn2.textContent = "Menu";
        btnArea.appendChild(btn2)

        const btn3 = document.createElement("button")
        btn3.setAttribute("id", "btn3");
        btn3.textContent = "Contact";
        btnArea.appendChild(btn3)

        container.appendChild(btnArea)

    }
    /**create a footeer element  */
    function createFooter() {
        const footer = document.createElement("div");
        footer.setAttribute("id", "footer");

        const logo = document.createElement("div");
        logo.setAttribute("id", "logo");
        logo.textContent = "Wave Cafe - ";

        const footerText = document.createElement("div");
        footerText.setAttribute("id", "footerText");
        footerText.textContent = `${new Date().getFullYear()} - created by Snt  - `;

        const githubIcon = document.createElement("a");
        githubIcon.classList.add("fab");
        githubIcon.classList.add("fa-github");
        githubIcon.href = "https://github.com/snt85c";

        footer.appendChild(logo);
        footer.appendChild(footerText);
        footer.appendChild(githubIcon);

        document.body.appendChild(footer);
    }
}

/**create the main content of the page */
function createContent() {

    const content = document.createElement("div")
    content.setAttribute("id", "content");
    content.textContent = "content box";
    container.appendChild(content);
    document.getElementById("btn1").classList.add("active")
    homePage()
    contentSelector()

    /**event listener to select the content of the page */
    function contentSelector() {
        document.addEventListener("click", (e) => {
            if (e.target.id == "btn1") {
                e.target.classList.add("active");
                removeActiveClass(e);
                homePage();
            }
            if (e.target.id == "btn2") {
                e.target.classList.add("active");
                removeActiveClass(e);
                menuPage();
            }
            if (e.target.id == "btn3") {
                e.target.classList.add("active");
                removeActiveClass(e);
                contactPage();
            }
        });

        /**remove the class "active" from the buttons when they are not current target of event click. Allows to have only one "active" button per time */
        function removeActiveClass(e) {
            const buttons = document.querySelectorAll("button");
            buttons.forEach(button => {
                if (button.id !== e.target.id) button.classList.remove("active");
            });


        }
    }

}


export { pageStructure };