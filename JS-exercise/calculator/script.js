/**EXPLANATION: create elements for special buttons plus 2 screens. each button/key number concatenates a string/number to currentNumber and updates screens. When i press an operation button/key it will check if the currentOperation variable is empty with the Evaluate function(checking if there isnt another operation in the queue/if we are chaining operations in one line). if there is, it will assume we are chaining operations, calculate it and keep it hidden, if not, it will update currentOperation with the new sign, store the currentNumber value in firstNumber, then clear the currentNumber variable for new use. number keys/buttons will now update a clear currentNumber variable. When we press "Enter" the currentNumber, firstNumber, and the signs in currentOperations are passed to the Calculate method which decide with a switch case on the sign which operation function to access.   */

//START assignation GLOBAL VARIABLES---------------------------------------------

let currentNumber = "";
let currentOperation = "";
let firstNumber = "";

//START assignation BUTTONS---------------------------------------------

const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");

const btnClear = document.getElementById("c").addEventListener("click", clearFunction);
const btnDelete = document.getElementById("d").addEventListener("click", deleteFunction);
const btnResult = document.getElementById("=").addEventListener("click", resultFunction);

document.addEventListener("click", (e) => {
    if (e.target.className == "calc") {
        evaluateOps(e.target.textContent);
    }
    if (e.target.className == "number") {
        currentNumber += e.target.id;
        screen1.value += e.target.id;
        screen2.value += e.target.id;
    }
    /**single event listener, if the target of the click has a class "calc", then start evaluate function with that operand, if "number", then add it  */
});

//START assignation KEYBOARD KEYS---------------------------------------------

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        resultFunction();
    }
    if (e.key === "c") {
        clearFunction();
    }
    if (e.key === "Backspace") {
        deleteFunction();
    }
    if (e.key === "+" ||
        e.key === "-" ||
        e.key === "*" ||
        e.key === "/") {
        evaluateOps(e.key);
    }
    if (e.key >= "0" && e.key <= "9") {
        currentNumber += e.key;
        screen1.value += e.key;
        screen2.value += e.key;
    }
    /**assign a single event listener to the DOM document that looks for a particular keydown, then execute evaluateOps / OPERATION KEY ONLY*/
});

//START  DEL/CLEAR/RESULT FUNCTIONS---------------------------------------------

function resultFunction() {
    calculate(currentOperation, firstNumber, currentNumber);
    screen2.value = currentNumber;
    currentOperation = "";
    /**currentOperations is reset to an empty value after the method, otherwise it bugs chained operations(eg:1+1+1) */
}

function deleteFunction() {
    currentNumber = currentNumber.slice(0, -1);
    screen1.value = screen2.value = currentNumber;
    /**removes the last element of the array containing the number, then updates both screens*/
}

function clearFunction() {
    screen2.value = screen1.value = currentNumber = firstNumber = currentOperation = "";
    /**clears every value stored as well as the screen */
}

//START OPERATION FUNCTIONS---------------------------------------------

function add(a, b) {
    return parseInt(a) + parseInt(b);
}

function sub(a, b) {
    return parseInt(a) - parseInt(b);
}

function mult(a, b) {
    return parseInt(a) * parseInt(b);
}

function div(a, b) {
    if (a == 0 || b == 0) return "ERR";
    return parseInt(a) / parseInt(b);
}
//START OPERAND EVALUATION AND CALCULATION FUNCTIONS---------------------------------------------

function evaluateOps(value) {
    if (currentOperation !== "") {
        calculate(currentOperation, firstNumber, currentNumber);
        /**if we are chaining calculations, the currentOperation variable will be already assigned. in that case it will perform the operation of what we already have without showing it as it assumes we already have firstNumber, currentNumber and a currentOperation sign */
    }
    currentOperation = value
    screen1.value += currentOperation;
    firstNumber = currentNumber;
    currentNumber = screen2.value = "";
    /**otherwise save currentNumber in firstNumber and clear currentNumber for further usage, as well as update the screens*/
}

function calculate(currentOperation, a, b) {
    switch (currentOperation) {
        case "+":
            currentNumber = add(a, b).toString();
            break;
        case "-":
            currentNumber = sub(a, b).toString();
            break;
        case "*":
            currentNumber = mult(a, b).toString();
            break;
        case "/":
            currentNumber = div(a, b).toString();
            break;
    }
    /**switch case, each convert the result of the operation back to string(otherwise the delete button wont have access to string manipulation methods and will provoke an error when clicked). only updates the screen2 */
}

clearFunction(); /**clear the calculator at startup, just in case */