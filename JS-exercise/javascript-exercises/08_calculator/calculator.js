const add = function(a, b) {
    return a + b;
};

const subtract = function(a, b) {
    return a - b;
};

const sum = function(arr) {
    const result = arr.reduce((total, number) => {
        return total + number;
    }, 0)
    return result;
};


const multiply = function(arr) {
    const result = arr.reduce((multiply, number) => {
        return multiply * number;
    }, 1);
    return result;
};

const power = function(a, b) {
    return Math.pow(a, b);
};

const factorial = function(num) {
    if (num == 0 || num == 1) return 1;
    return num * factorial(num - 1);
};

// Do not edit below this line
module.exports = {
    add,
    subtract,
    sum,
    multiply,
    power,
    factorial
};