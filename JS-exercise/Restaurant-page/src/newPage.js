function newPage() {
    return "Greetings from newPage.js";
}

function divTest(type, string) {
    const div = document.createElement(type);
    div.textContent = string;
    div.classList.add("style1");
    return div;
}

export { newPage, divTest };