const repeatString = function(content, number) {
    let result = "";
    if (number < 0) {
        return "ERROR";
    }
    for (let i = 0; i < number; i++) {
        result += content;
    }
    return result;
    console.log(result);
};

// Do not edit below this line
module.exports = repeatString;