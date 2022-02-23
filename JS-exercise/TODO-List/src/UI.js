import Person from "./Person";
import Storage from "./Storage";

const container = document.getElementById("container");
const hikerContainer = document.getElementById("hikersContainer");
const storage = new Storage;

function UserInterface() {

    (function init() {
        createHikerButton();
        loadHikers();
    })();

    //creates the "add a new hiker button"
    function createHikerButton() {
        //creates a div
        const addHikerContainer = document.createElement("div");
        addHikerContainer.style.display = "none";

        //create an add button
        let addButton = document.createElement("img")
        addButton.setAttribute("id", "addButton")
        addButton.setAttribute("title", "click to add a new hiker");
        addButton.src = "img/addHiker.png";

        //create an ok button
        let okButton = document.createElement("button")
        okButton.setAttribute("title", "confirm name")
        okButton.setAttribute("id", "okButton");
        okButton.textContent = "OK";

        //create an input
        let inputField = document.createElement("input")
        inputField.setAttribute("id", "inputField")
        inputField.setAttribute("type", "text")
        inputField.setAttribute("placeholder", "create a new Hiker")
        inputField.required = true;
        inputField.minLength = 3;
        inputField.maxLength = 20;

        //add input and ok button to the previosly created div
        addHikerContainer.appendChild(inputField)
        addHikerContainer.appendChild(okButton)

        //append that and the add button to the container, above hikercontainer 
        container.appendChild(addButton)
        container.appendChild(addHikerContainer)

        //if addbutton is pressed, addhikercontainer style become flex
        addButton.addEventListener("click", () => {
            if (addHikerContainer.style.display == "none") {
                addHikerContainer.style.display = "flex"
            } else {
                addHikerContainer.style.display = "none"
            }
        });


        //if i press the ok button, create element on screen with the name from the input form and a class of "hiker", save it with his name and class, set this container display to "none", empty the inpput field for further use
        okButton.addEventListener("click", () => {
            if (inputField.validity.valid) {
                createElementOnScreen(inputField.value, "hiker");
                storage.save(inputField.value, new Person(inputField.value));
                inputField.value = "";
                addHikerContainer.style.display = "none";

            } else {
                okButton.setCustomValidity("invalid name");
                okButton.reportValidity();
            }
        })
    }

    //gets the users from the localStorage and load them on screen// gets an array of elements from storage, for each element create a single element with the name, then append a new div on it with all the details
    function loadHikers() {
        const stored = storage.load();
        stored.forEach(hiker => {
            //for each item, create the first div of hiker class and the  AMX buttons
            const addDiv = createElementOnScreen(hiker.name, "hiker");

            //for each items in the hiker.wardrobe
            for (let i = 0; i < hiker.wardrobe.length; i++) {

                //create an empty div and load a const with a ready to deploy class name, composed by the name and the wardrobe.name(to make each wardrobe item exclusive to the hiker)
                let wardrobeDiv = document.createElement("div");
                const hikerID = hiker.name + "_" + hiker.wardrobe[i].name;

                //if there isn't such div with the specific hikerclass name, we create one. its a div that will contain all the items of that type for that hiker, otherwise (if it exist)we load it
                if (document.getElementById(hikerID) === null) {
                    wardrobeDiv = createElementOnScreen([
                        hikerID,
                        hiker.wardrobe[i].name
                    ], "wardrobe");
                } else {
                    wardrobeDiv = document.getElementById(hikerID);
                }
                //we create a new div by passing [wardrobe.name, wardrobe.note, wardrobe.checkbox], ["item", hiker.name]
                let itemDiv = createElementOnScreen([
                    [hiker.wardrobe[i].set[0].name],
                    [hiker.wardrobe[i].set[0].note],
                    [hiker.wardrobe[i].set[0].checkbox]
                ], [
                    "item",
                    hiker.name
                ])
                wardrobeDiv.appendChild(itemDiv);
                addDiv.appendChild(wardrobeDiv);
            }
            //append to main container
            hikerContainer.appendChild(addDiv);
        });
    }

    //creates the basic block for each user:[NAME, HIKER/ITEM]. depending on the type it will outpu 3 different types of div with different data. contains methods for adding various buttons to the elements as well as eventListeners
    function createElementOnScreen(name, type) {

        //create a new div, will be used in all if statements
        const div = document.createElement("div");
        div.style.overflowX = "auto"

        //if its an hiker div, as in the main div with the name of the hiker
        if (type === "hiker") {
            div.setAttribute("id", name);
            div.setAttribute("class", "hiker");
            div.textContent = name;
            div.appendChild(addRemoveButton(name));
            div.appendChild(addModifyButton(name));
            div.appendChild(addWardrobeButton())
            div.appendChild(addCollapseButton())

            //being an hiker div, after creating it i need to append it on the hikercontainer, deleting this will have the loadHiker function ignore the rule to create a new div for each wardrobe elements
            hikerContainer.appendChild(div);
        }

        //if its type "wardrobe" eg: BODY, or BOTTOM, create a div with the name and a collapse button
        if (type === "wardrobe") {
            div.setAttribute("id", name[0])
            div.setAttribute("class", name[1])
            div.setAttribute("class", "panel");
            div.textContent = name[1];
            div.style.border = "1px solid orange";
            div.appendChild(addCollapseButton())
        }

        //if its an item 
        if (type[0] === "item") {
            //creates 2 label and a breaker label
            const text1 = document.createElement("label")
            const text2 = document.createElement("label")
            const breaker = document.createElement("label")

            //set attributes for the div and the label elements 
            div.setAttribute("id", "item");

            text1.setAttribute("id", "text1")
            text2.setAttribute("id", "text2")
            breaker.setAttribute("id", "breaker")

            //set the content of the labels
            text1.textContent = name[0];
            breaker.textContent = " // "
            text2.textContent = name[1];

            //DO NOT MODIFY THE ORDER, AS THE ELEMENTS WHERE HE HAS TO TAKE HIS DATA ARE HARDWIRED IN THE CODE
            div.appendChild(text1);
            div.appendChild(breaker)
            div.appendChild(text2);
            div.appendChild(addRemoveButton(type[1]));
            div.appendChild(addModifyButton(type[1]));
            div.appendChild(addCheckboxButton(type[1], name[2]));
            //DO NOT MODIFY THE ORDER, AS THE ELEMENTS WHERE HE HAS TO TAKE HIS DATA ARE HARDWIRED IN THE CODE
        }

        function addCheckboxButton(name, checked) {
            const checkbox = document.createElement("img");

            if (checked[0] == true) {
                checkbox.src = "img/checkboxY.png";
                checkbox.setAttribute("id", "checkboxY");
            } else {
                checkbox.src = "img/checkboxN.png";
                checkbox.setAttribute("id", "checkboxN");
            }
            checkbox.setAttribute("title", "tick to confirm availability");
            checkbox.style.width = "14px"; //needs to be lightly smaller than the others, hence the rule here

            checkbox.addEventListener("click", (e) => {
                if (e.target.id == "checkboxN") {
                    e.target.id = "checkboxY"
                    e.target.src = "img/checkboxY.png"
                    const nodes = e.target.parentNode.childNodes;
                    storage.modify(name, [nodes[0].textContent, nodes[2].textContent], true)
                } else {
                    e.target.id = "checkboxN"
                    e.target.src = "img/checkboxN.png";
                    const nodes = e.target.parentNode.childNodes;
                    storage.modify(name, [nodes[0].textContent, nodes[2].textContent], false)
                }
                loader();
            })
            return checkbox;
        }

        function addModifyButton(name) {
            //create and set a div M for modifying info on screen
            const modify = document.createElement("img");
            modify.setAttribute("class", name)
            modify.setAttribute("id", "modify");
            modify.setAttribute("title", "modify the tab");
            modify.src = "img/modify.png";

            //if click, send the event info to the method below
            modify.addEventListener("click", (e) => {
                modifyEventListener(e);
            })

            function modifyEventListener(e) {
                const elementsToModify = [];
                const hikerName = e.target.className;

                //get all the child nodes from the parent
                const nodes = e.target.parentNode.childNodes;

                //get all the label node and push it in the array
                nodes.forEach(node => {
                        if (node.localName == "label" && node.id != "breaker") {
                            elementsToModify.push(node);
                        }
                    })
                    //if there are no label elements, it means we are modifing the hiker  
                if (elementsToModify.length == 0) {
                    document.getElementById(hikerName).appendChild(modifyHikerLayout(elementsToModify, hikerName))

                } else {
                    //otherwise we are modifying an item, we get all the nodes and we select the last one were we will append the layout to modify the info
                    const targetNodes = e.target.parentNode.parentNode.childNodes;
                    targetNodes[targetNodes.length - 1].appendChild(modifyHikerLayout(elementsToModify, hikerName));
                }

            }

            function modifyHikerLayout(elementsToModify, hikerName) {
                //create an emoty div
                const modifyHikerContainer = document.createElement("div");

                //create two input fields and a ok button
                let inputField1 = document.createElement("INPUT");
                inputField1.setAttribute("type", "text");
                inputField1.setAttribute("id", "inputField1")

                let inputField2 = document.createElement("INPUT");
                inputField2.setAttribute("type", "text");
                inputField2.setAttribute("id", "inputField2")

                let okButton = document.createElement("button")
                okButton.textContent = "OK";
                okButton.setAttribute("title", "confirm change")

                //if there are no elements to modify (its an hiker div)
                if (elementsToModify.length == 0) {

                    //add on the div only one input field, the ok button and the X
                    inputField1.value = hikerName;
                    modifyHikerContainer.appendChild(inputField1);
                    modifyHikerContainer.appendChild(okButton);
                    modifyHikerContainer.appendChild(addRemoveButton());

                    //if clicked, send to storage.modify just the name and the value of the input
                    okButton.addEventListener("click", () => {
                        if (hikerName != inputField1.value) {
                            //if the values are different, then modify, otherwise it would remove the item by virtue of the modify method, which removes the old item when saving the new one
                            storage.modify(hikerName, undefined, inputField1.value);
                            loader();
                        }
                    });

                } else { //if there are items in elementstomodify, we assume is an item, we poplulate the div accordingly
                    inputField1.value = elementsToModify[0].textContent
                    inputField2.value = elementsToModify[1].textContent
                    modifyHikerContainer.appendChild(inputField1);
                    modifyHikerContainer.appendChild(inputField2);
                    modifyHikerContainer.appendChild(okButton);
                    modifyHikerContainer.appendChild(addRemoveButton());

                    //if clicked, we send the name, elements to modify and the new values 
                    okButton.addEventListener("click", () => {
                        let input1 = document.getElementById("inputField1").value
                        let input2 = document.getElementById("inputField2").value
                        storage.modify(hikerName, elementsToModify, [input1, input2])
                        loader();
                    })
                }

                //return a div to append
                return modifyHikerContainer;
            }

            return modify;
        }

        function addWardrobeButton() {
            //create a div and set attributes
            const addElement = document.createElement("img");
            addElement.setAttribute("id", "addWardrobe");
            addElement.setAttribute("title", "add an element to the hiker");
            addElement.src = "img/add.png";

            //if click, append to the parent element a div with the selection
            addElement.addEventListener("click", (e) => {
                e.target.parentElement.appendChild(createSelection(e.target.parentElement.id));
            });

            //create a select element 
            function createSelection(parentId) {
                const element = document.createElement("div");
                element.setAttribute("id", "element");

                const wardrobe = document.createElement("select");
                wardrobe.setAttribute("id", "select");
                const optionH = document.createElement("option");
                const optionB = document.createElement("option");
                const optionBottom = document.createElement("option");
                const optionShoes = document.createElement("option");
                const optionExtra = document.createElement("option");

                optionH.textContent = "Head";
                optionB.textContent = "Body";
                optionBottom.textContent = "Bottom";
                optionShoes.textContent = "Shoes";
                optionExtra.textContent = "Extra";

                wardrobe.appendChild(optionH);
                wardrobe.appendChild(optionB);
                wardrobe.appendChild(optionBottom);
                wardrobe.appendChild(optionShoes);
                wardrobe.appendChild(optionExtra);

                let inputName = document.createElement("INPUT");
                inputName.setAttribute("type", "text");
                inputName.setAttribute("id", "inputName");

                let inputNote = document.createElement("INPUT");
                inputNote.setAttribute("type", "text");
                inputNote.setAttribute("id", "inputNote");

                let okButton = document.createElement("button")
                okButton.textContent = "Confirm";
                okButton.setAttribute("id", "confirm");
                okButton.setAttribute("title", "confirm selection")

                okButton.addEventListener("click", (e) => {
                    if (inputNote.value != "" && inputName.value != "") {

                        const name = parentId;
                        const selectValue = wardrobe.value;
                        const inputNameValue = inputName.value;
                        const inputNoteValue = inputNote.value;

                        const newDiv = document.createElement("div")
                        newDiv.textContent = selectValue + ": " + inputNameValue + " // " + inputNoteValue;
                        storage.saveB(name, [selectValue, inputNameValue, inputNoteValue]);
                        newDiv.appendChild(addRemoveButton());
                        document.getElementById(parentId).appendChild(newDiv)
                        element.remove();

                        inputName.value = inputNote.value = "";
                    }
                    loader(); ///////////////HERE
                })

                element.appendChild(wardrobe);
                element.appendChild(inputName);
                element.appendChild(inputNote);
                element.appendChild(okButton);
                element.appendChild(addRemoveButton());

                return element;
            }
            return addElement;
        }

        function addRemoveButton(name) {
            //create and set attributes for the X button
            const remove = document.createElement("img");
            remove.textContent = "X";
            remove.style.color = "red"
            remove.src = "img/remove.png";
            remove.style.height = "15px";
            remove.setAttribute("id", "remove");
            remove.setAttribute("class", name)
            remove.setAttribute("title", "remove the element");
            remove.style.float = "right";
            remove.style.display = "inline-block";


            remove.addEventListener("click", (e) => {
                //if the target is an item
                if (e.target.id == "remove" && e.target.parentElement.id == "item") {
                    //remove in mode B passing the name of the class NOT IMPLEMENTED YET
                    e.target.parentElement.style.display = "none"
                    const elementsToModify = [];
                    const nodes = e.target.parentNode.childNodes;

                    nodes.forEach(node => {
                        if (node.localName == "label" && node.id != "breaker") {
                            elementsToModify.push(node.textContent);
                        }
                    })
                    storage.remove("b", [e.target.className, elementsToModify[0], elementsToModify[1]])

                } else { //if its not an item, is an hiker
                    e.target.parentElement.style.display = "none"
                    storage.remove("a", e.target.className)
                }
                loader(); ///////////////HERE
            });

            //return the div to be appended 
            return remove;
        }

        function addCollapseButton() {
            const collapse = document.createElement("img")
            collapse.src = "img/collapse.png";
            collapse.style.height = "15px";
            collapse.setAttribute("id", "collapse");
            // collapse.setAttribute("class", name)
            collapse.setAttribute("title", "collapse the tab");
            collapse.style.float = "right";
            collapse.style.display = "inline-block";

            collapse.addEventListener("click", (e) => {
                accordionDiv(e)
            })

            function accordionDiv(e) {
                var acc = e.target.parentElement;
                // Toggle between adding and removing the "active" class, to highlight the button that controls the panel
                acc.classList.toggle("active");
                //Toggle between hiding and showing the active panel 
                var panel = acc.children;
                //gets all the children elements from each hiker class element
                for (let i = 0; i < panel.length; i++) {
                    //if the display is block and the type of element is a div but is not the collapse div(otherwise it will display:none and it will disappear)
                    if (panel[i].style.display === "block" && panel[i].localName == "div" && panel[i].id != "collapse") {
                        panel[i].style.display = "none";
                        collapse.src = "img/expand.png";
                        collapse.setAttribute("title", "expand the tab");
                    } else {
                        panel[i].style.display = "block";
                        collapse.src = "img/collapse.png";
                        collapse.setAttribute("title", "collapse the tab");

                    }
                }
            }

            return collapse;
        }

        //basic implementation to clear the hikerContainer and execute loadHiker, to refresh the page with new data after insertion
        function loader() {
            while (hikerContainer.firstChild) {
                hikerContainer.removeChild(hikerContainer.firstChild);
            }
            loadHikers();
        }

        //this return the div out of the method, where it will be appended 
        return div;
    }
}
export { UserInterface };