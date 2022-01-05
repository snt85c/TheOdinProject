const reverseString = function(str) {
    let result = [];
    for (let i = str.length; i > -1; i--) {
        result.push(str[i]);
    }
    result = result.join("");
    return result;
};

// Do not edit below this line
module.exports = reverseString;