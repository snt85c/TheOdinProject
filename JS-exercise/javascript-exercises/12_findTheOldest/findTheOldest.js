const findTheOldest = function(people) {

    const result = people.reduce((oldest, person) => {
        const oldestPerson = oldest.yearOfDeath - oldest.yearOfBirth;
        /**oldest is initialized with the first element alread, i calculate the age and store it in a variable */
        const currentPerson = person.yearOfDeath - person.yearOfBirth;
        /**person is the second element,  */
        return currentPerson > oldestPerson ? person : oldest;
        //if person > oldest then person is returned and becomes oldest in next iteration with the next person
    });
    return result;

};


// Do not edit below this line
module.exports = findTheOldest;