const sumAll = function(num1, num2) {
    var result = 0;
    if ((!Number.isInteger(num1) || !Number.isInteger(num2)) || (num1 < 0 || num2 < 0)) {
        return "ERROR";
        //checks if the paramters are numbers and are positive
    }
    if (num1 > num2) {
        [num1, num2] = [num2, num1];
        //if the first number is bigger, swap them
    }
    for (var i = num1; i <= num2; i++) {
        result += i;
    }
    return result;
};


// Do not edit below this line
module.exports = sumAll;