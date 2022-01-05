const leapYears = function(year) {
    /**EXPLANATION: Leap years are years divisible by four (like 1984 and 2004). However, years divisible by 100 are not leap years (such as 1800 and 1900) unless they are divisible by 400 (like 1600 and 2000, which were in fact leap years)
 
    so, we go for an OR logic in the return, where the result is true if either one of the condition or both  are true .
    if year divisible by 4 and not by 100 the entire statement is true, if not as it might be divisible by 100, the rest of the statement checks if divisible by 400. if true, then all the startement is true. otherwise 
    */
    return ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0);

};


// Do not edit below this line
module.exports = leapYears;