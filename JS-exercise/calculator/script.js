const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");
const btnC = document.getElementById("c");
const btnDelete = document.getElementById("d");
const btnResult = document.getElementById("=");
const btnCalc = document.querySelectorAll(".calc");
const btnNumbers = document.querySelectorAll(".number");
let currentNumber = [];
currentOperation = "";

let firstNumber = 0;

btnDelete.addEventListener("click", () => {
    currentNumber = currentNumber.slice(0, -1);
    screen1.value = currentNumber;
    screen2.value = currentNumber;
});
btnC.addEventListener("click", clear);

btnCalc.forEach(button => {
    button.addEventListener("click", () => {
        currentOperation = button.textContent;
        screen1.value += currentOperation;
        screen2.value = "";
        firstNumber = currentNumber;
        currentNumber = [];
    });
});

btnNumbers.forEach(button => {
    button.addEventListener("click", () => {
        currentNumber += button.textContent;
        screen1.value += button.textContent;
        screen2.value += button.textContent;
    });
});

btnResult.addEventListener("click", () => {
    calculate(currentOperation, firstNumber, currentNumber);
});

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

}

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

function clear() {
    screen2.value = "";
    screen1.value = "";
    currentNumber = [];
}

clear();