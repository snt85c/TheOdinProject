const overlay = document.getElementById("overlay");

document.addEventListener("click", (e) => {
    if (e.target.id == "newBook") {
        overlay.style.display = toggleOverlay();
    }
});

function toggleOverlay() {
    return overlay.style.display == "block" ? "none" : "block";

}