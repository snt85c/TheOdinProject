//ARGUMENTS is an Array-like object accessible inside functions that contains the values of the arguments passed to that function.

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments

const removeFromArray = function() {
    for (let y = 1; y < arguments.length; y++) {
        for (let i = 0; i < arguments[0].length; i++) {
            if (arguments[0][i] === arguments[y]) {
                arguments[0].splice(i, 1);
            }
        }
    }
    return arguments[0];
};
//first loop is to get the index(y) from arguments[1] of the elements to be removed 
//second loop is to cycle trought the array in arguments[0] 
//checks if the current element of the array is the same as the one to be removed
//from arguments[0], removes at index "i" for "1" element

// Do not edit below this line
module.exports = removeFromArray;