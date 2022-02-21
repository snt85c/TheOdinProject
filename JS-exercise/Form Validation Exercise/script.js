const email = document.getElementById("mail");

email.addEventListener("input", (e) => {
    if (email.validity.typeMismatch) {
        email.setCustomValidity("I am expecting a valid address!(message from JS)");
        email.reportValidity();
    } else {
        email.setCustomValidity("");
    }
});