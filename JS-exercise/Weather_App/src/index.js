import * as apiFunctions from "./APIFunctions";
import * as domFunctions from "./DOMFunctions"

const search = document.getElementById("submit");
const input = document.getElementById("input")
apiFunctions.geolocation()

search.addEventListener("click", () => {
    domFunctions.search(input.value)
    input.value = "";
})