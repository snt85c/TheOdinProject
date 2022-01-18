/**EXPLANATION: create elements for each buttons and keyboards plus 2 screens. each button number concatenates a string/number to currentNumber and updates screens. When i press an operation button/key it will check if the currentOperation variable is empty with the Evaluate function(checking if there isnt another operation in the queue/if we are chaining operations in one line). if there is, it will assume we are chaining operations, calculate it and keep it hidden, if not, it will update currentOperation with the new sign, store the currentNumber value in firstNumber, then clear the currentNumber variable for new use. number keys/buttons will now update a clear currentNumber variable. When we press "Enter" the currentNumber, firstNumber, and the signs in currentOperations are passed to the Calculate method which decide with a switch case on the sign which operation function to access.   */

//START assignation GLOBAL VARIABLES---------------------------------------------

let currentNumber = "";/**changed from ARRAY[] to STRING as part of old architecture TO BE TESTED YET*/
let currentOperation = "";
let firstNumber = "";

//START assignation BUTTONS---------------------------------------------

const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");
const btnClear = document.getElementById("c").addEventListener("click", clearFunction);
const btnDelete = document.getElementById("d").addEventListener("click", deleteFunction);
const btnResult = document.getElementById("=").addEventListener("click", resultFunction);
const btnCalculate = document.querySelectorAll(".calc");
const btnNumbers = document.querySelectorAll(".number");

btnCalculate.forEach(button => {
    button.addEventListener("click", () => {
        evaluateOps(button.textContent);
        /**assign evaluateOps to operators(+-*) buttons to assign the sign to currentOperator OPERATION BUTTONS ONLY */
    });
});

btnNumbers.forEach(button => {
    button.addEventListener("click", () => {
        currentNumber += button.textContent;
        screen1.value += button.textContent;
        screen2.value += button.textContent;
        /**adds eventlistener to each NUMBERED BUTTONS ONLY (colelcted by querySelectorAll(".number");
         * it append the value when clicked to currentNumber, as well as updating both screens
         */
    });
});

//START assignation KEYBOARD KEYS---------------------------------------------

document.addEventListener("keydown", (e) => {
  if(e.key === "+" 
     || e.key === "-" 
     || e.key === "*" 
     || e.key === "/" 
     || e.key === "Enter" 
     || e.key === "c" 
     || e.key === "backspace"){
    evaluateOps(e.key);
  }
  /***assign a single event listener to the DOM document that looks for a particular keydown, then execute evaluateOps / OPERATION KEY ONLY*/
});

    for (let i = 0; i <= 9; i++) {
        document.addEventListener("keydown", (e) => {
            if (e.key == i) {
                currentNumber += i;
                screen1.value += i;
                screen2.value += i;
                /**loops from 0 to 9 and adds eventlistener to each NUMBER KEY ONLY */
            }
        });
    }

//START  DEL/CLEAR/RESULT FUNCTIONS---------------------------------------------

function resultFunction() {
    calculate(currentOperation, firstNumber, currentNumber);
    screen2.value = currentNumber;
    currentOperation = "";
    /**currentOperations is reset to an empty value after the method, otherwise it bugs chained operations(eg:1+1+1) */
}

function deleteFunction() {
    currentNumber = currentNumber.slice(0, -1);
    screen1.value = currentNumber;
    screen2.value = currentNumber;
    /**removes the last element of the array containing the number, then updates both screens*/
}

function clearFunction() {
    screen2.value = "";
    screen1.value = "";
    currentNumber = "";/**changed from []*/
    firstNumber = "";
    currentOperation = "";
    /**clears every value stored as well as the screen */
}


//START OPERATION FUNCTIONS---------------------------------------------

function sum(a, b) {
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
    screen2.value = "";
    firstNumber = currentNumber;
    currentNumber = "";/**changed from []*/
    /**otherwise save currentNumber in firstNumber and clear currentNumber for further usage, as well as update the screens*/
}

function calculate(currentOperation, a, b) {
    switch (currentOperation) {
        case "+":
            currentNumber = sum(a, b).toString();
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
