/**EXPLANATION: 
 * "npm init -y"
 * creates package.json, -y simply gets default values and skips questions to the user
 * 
 * "npm install webpack webpack-cli --save-dev"
 * 
  we install webpack and webpack-cli (stands for console line)
 * 
 * production code should stay in /src while distribution in /dist
 * 
 * "npm run build" updates the main.js with all the dependencies as well as updates from other .Js files. this is because the package.json as scripts:{"build" : "webpack"}, which execute the command remote isntea of using the 
 * 
 * 
 * "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
	"build" : "webpack"

    import _ from "lodash"

    instructs that we are importing modules from lodash, which is in npm
 */

import _ from 'lodash';
import "./style.css";
import myName from './myName';


function component() {
    const element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add("hello");

    return element;
}

function component1() {
    const element = document.createElement("div");
    element.innerHTML = myName("Santi");
    return element;
}

document.body.appendChild(component());
document.body.appendChild(component1())