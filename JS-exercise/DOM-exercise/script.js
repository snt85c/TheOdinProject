// your javascript file
const container = document.querySelector('#container');

const content = document.createElement('div');
content.classList.add('content');
content.textContent = 'This is the glorious text-content!';

/**<p> with red text that says “Hey I’m red!” */
const p = document.createElement("p");
p.classList.add("p");
p.textContent = " Hey I'm red!";
p.setAttribute("style", "color:red; background:aquamarine");

/** <h3> with blue text that says “I’m a blue h3!” */
const h3 = document.createElement("h3");
h3.classList.add("h3");
h3.textContent = "I'm a blue h3!";
h3.setAttribute("style", "color:blue; background:orange");
/**<div> with a black border and pink background color with the following elements inside of it: */
const div = document.createElement("div");
div.classList.add("div");
div.setAttribute("style", "border:thick solid black ; background:pink");

/**<h1> that says “I’m in a div” */
const h1 = document.createElement("h1");
h1.classList.add("h1");
h1.textContent = "im in a div";

/**<p> that says “ME TOO!” */
const p2 = document.createElement("p");
p2.classList.add("p2");
p2.textContent = "ME TOO!";
p2.setAttribute("style", "color:red; border: dashed orange");

const btn = document.querySelector("#btn");
btn.addEventListener('click', () => {
    alert("btn");
});

//change style on click
const btn2 = document.querySelector("#btn2");
btn2.addEventListener("click", function(e) {
    e.target.style.background = 'blue';
})

/**btn3 gets his message from a named function instead of an arrow function */
const btn3 = document.querySelector("#btn3");
btn3.addEventListener("click", alertMessage);

function alertMessage() {
    alert("alert function");
}

container.appendChild(content);
container.appendChild(p);
container.appendChild(h3);
/**after creating the div with createElement, append the <h1> and <p> to it before adding it to the container.*/
div.appendChild(h1);
div.appendChild(p2);
container.appendChild(div);