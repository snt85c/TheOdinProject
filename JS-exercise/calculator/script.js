const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");
const btnC = document.getElementById("c");
const btnDelete = document.getElementById("d");
const btnResult = document.getElementById("=");
const btnCalc = document.querySelectorAll(".calc");
const btnNumbers = document.querySelectorAll(".number");
let currentNumber = [];
let currentOperation = "";
let firstNumber = 0;


//TODO add keyboard support
btnDelete.addEventListener("click", () => {
    currentNumber = currentNumber.slice(0, -1);
    screen1.value = currentNumber;
    screen2.value = currentNumber;
    /**removes the last element of the array containing the number, then updates both screens*/
});

btnC.addEventListener("click", clear);

btnCalc.forEach(button => {
    button.addEventListener("click", () => {
        if (currentOperation !== "") {
            calculate(currentOperation, firstNumber, currentNumber);
            /**if we are chaining calculations, the currentOperation variable will be already assigned. in that case it will perform the operation of what we already have without showing it as it assumes we already have firstNumber, currentNumber and a currentOperation sign */
        }
        currentOperation = button.textContent;
        screen1.value += currentOperation;
        screen2.value = "";
        firstNumber = currentNumber;
        currentNumber = [];
        /**when i click an operation symbol, store the symbol in currentOperation, add the symbol to the top screen visuals, empty the bottom screen, assign the currentNumber to another variable, then clear the currentNumber Variable. this way we are storing what is before we pressed the operation button and saving the symbol somwhere else, as well as resetting currentNumber for further usage  */
    });
});

btnNumbers.forEach(button => {
    button.addEventListener("click", () => {
        currentNumber += button.textContent;
        screen1.value += button.textContent;
        screen2.value += button.textContent;
        /**adds eventlistener to each numbered button (colelcted by querySelectorAll(".number");
         * it append the value when clicked to currentNumber, as well as both screens
         */
    });
});

btnResult.addEventListener("click", () => {
    calculate(currentOperation, firstNumber, currentNumber);
    currentOperation = "";
    /**currentOperations is reset to an empty value after the method, otherwise it bugs chained operations(eg:1+1+1) */
});

function sum(a, b) {
    return parseInt(a) + parseInt(b);
    /**each of these fucntions has to convert the variable to an int to make it work. it iwll be converted back to a string in the method calculate() */
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

function calculate(currentOperation, a, b) {
    switch (currentOperation) {
        case "+":
            currentNumber = sum(a, b).toString();
            screen2.value = currentNumber;
            break;
        case "-":
            currentNumber = sub(a, b).toString();
            screen2.value = currentNumber;
            break;
        case "*":
            currentNumber = mult(a, b).toString();
            screen2.value = currentNumber;
            break;
        case "/":
            currentNumber = div(a, b).toString();
            screen2.value = currentNumber;
            break;
    }
    /**switch case, each convert the result of the operation back to string(otherwise the delete button wont have access to string manipulation methods and will provoke an error when clicked). only updates the screen2 */
}


function clear() {
    screen2.value = "";
    screen1.value = "";
    currentNumber = [];
    firstNumber = 0;
    currentOperation = "";
    /**clears every value stored as well as the screen */
}

clear(); /**clear the calculator at startup */