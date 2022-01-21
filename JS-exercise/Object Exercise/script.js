const text = document.getElementById("show");

function Person() {} //empty constructor 

Person.type = "Human";
Person.job = "Wizard";
Person.secretName = "Voldemort";

Person.prototype.descr = function() {
    return `. You can call me ${Person.secretName}`;
}

Person.prototype.job = function() {
    return this.job;
}

function Wizard(name, surname) {
    this.name = name
    this.surname = surname
};

Wizard.prototype = Object.create(Person.prototype);
Wizard.prototype.description = function() {
    return `my name is ${this.name} ${this.surname}, i am a powerful ${Person.job} and i used to be ${Person.type}`;
}

const voldy = new Wizard("Tom", "Marvolo Riddle");

const Muggle = {
    name: "Carl",
    whoami: function() {
        return " my name is " + this.name + " the one who shall not be named is" + Person.secretName;
    }
};