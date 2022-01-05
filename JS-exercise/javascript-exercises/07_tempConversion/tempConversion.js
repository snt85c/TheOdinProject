const ftoc = function(fahr) {
    let temp = (fahr - 32) / 1.8000;
    //the formula returns the number rounded by one decimal place e.g 10.5 unless is 10.0 in this case it returns 10. otherwise use toFixed(1).
    return Math.round(temp * 10) / 10;
};

const ctof = function(cels) {
    let temp = (cels * 1.8000) + 32;
    return Math.round(temp * 10) / 10;
};
// Do not edit below this line
module.exports = {
    ftoc,
    ctof
};