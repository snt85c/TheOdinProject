import Person from "./Person";
import Storage from "./Storage";

const container = document.getElementById("container");
const hikerContainer = document.getElementById("hikersContainer");
const storage = new Storage;

//TODO: fix this mess, by aggregating similar methods inside classes (eg: buttons)

function Buttons() {




    return { loadButton };
}



export default class UI {

    init() {
        this.createHikerButton();
        this.loadHikers();
        this.ResetButton()
        this.loadButton();
        // storage.consoleLogLocalStorage();
    }

    ResetButton() {
        const reset = document.createElement("button")
        reset.textContent = "Clear"
        container.appendChild(reset)
        reset.addEventListener("click", () => {
            localStorage.clear();
            this.loadHikers();
        })
    }

    loadButton() {
        const load = document.createElement("button")
        load.textContent = "Load"
        container.appendChild(load)
        load.addEventListener("click", () => {
            load()
            return 1;
        })

    }

    load() {
        this.clearContainer()
        this.loadHikers();
    }


    clearContainer() {
        while (hikerContainer.firstChild) {
            hikerContainer.removeChild(hikerContainer.firstChild);
        }
    }

    accordionDiv(e) {
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
            } else {
                panel[i].style.display = "block";
            }
        }
    }


    /**creates the basic block for each user:[NAME, HIKER/ITEM] */
    createElementOnScreen(name, type) {

        //create a new div, will be used in both if statements
        const div = document.createElement("div");

        //if its an hiker div, as in the main div with the name of the hiker
        if (type == "hiker") {

            //set id and class
            div.setAttribute("id", name);
            div.setAttribute("class", "hiker");


            //put on screen the name
            div.textContent = name;

            //add X, M, and A button
            div.appendChild(this.addRemoveButton(name));
            div.appendChild(this.addModifyButton(name));
            div.appendChild(this.addWardrobeButton())
            div.appendChild(this.addCollapseButton())

            //being an hiker div, after creating it i need to append it on the hikercontainer, deleting this will have the loadHiker function ignore the rule to create a new div for each wardrobe elements
            hikerContainer.appendChild(div);

        }

        //if its an item 
        // user:[NAME, TYPE]
        //[wardrobe.name, wardrobe.note], [item, hikername] from this.loadHiker()
        if (type[0] == "item") {

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

            //append all in the div
            div.appendChild(text1);
            div.appendChild(breaker)
            div.appendChild(text2);
            div.appendChild(this.addRemoveButton(type[1]));
            div.appendChild(this.addModifyButton(type[1]));
        }
        //this return the div out of the method, where it will be appended 
        return div;
    }

    addModifyButton(name) {
        //create and set a div M for modifying info on screen
        const modify = document.createElement("img");
        modify.src = "img/modify.png";
        modify.style.height = "15px";
        modify.textContent = "M";
        modify.setAttribute("id", "modify");
        modify.setAttribute("class", name)
        modify.setAttribute("title", "modify the tab");
        modify.style.float = "right";
        modify.style.display = "inline-block";

        //if click, send the event info to the method below
        modify.addEventListener("click", (e) => {
            this.modifyEventListener(e);
        })

        return modify;
    }

    addCollapseButton(name) {
        const collapse = document.createElement("div")
        collapse.textContent = "V"
        collapse.setAttribute("id", "collapse");
        collapse.setAttribute("class", name)
        collapse.setAttribute("title", "collapse the tab");
        collapse.style.float = "right";
        collapse.style.display = "inline-block";

        collapse.addEventListener("click", (e) => {
            this.accordionDiv(e)
        })

        return collapse;
    }

    addRemoveButton(name) {
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

            } else { /*if its not an item, is an hiker*/
                e.target.parentElement.style.display = "none"
                storage.remove("a", e.target.className)
            }
            this.load(); ///////////////HERE
        });

        //return the div to be appended 
        return remove;
    }


    addWardrobeButton() {
        //create a div and set attributes
        const addElement = document.createElement("img");
        addElement.setAttribute("id", "addWardrobe");
        addElement.src = "img/add.png";
        addElement.style.height = "15px";
        addElement.setAttribute("title", "add an element to the hiker");
        addElement.textContent = "A";
        addElement.style.float = "right";
        addElement.style.display = "inline-block";

        //if click, append to the parent element a div with the selection
        addElement.addEventListener("click", (e) => {
            e.target.parentElement.appendChild(this.createSelection(e.target.parentElement.id));
        });

        return addElement;
    }

    createHikerButton() {
        //creates a div
        const addHikerContainer = document.createElement("div");
        addHikerContainer.style.display = "none";
        //create an add button
        let addButton = document.createElement("button")
        addButton.textContent = "Add a new Hiker";
        addButton.setAttribute("title", "click to add a new hiker");
        //create an ok button
        let okButton = document.createElement("button")
        okButton.textContent = "OK";
        okButton.setAttribute("title", "confirm name")
            //create an input
        let inputField = document.createElement("INPUT");
        inputField.setAttribute("type", "text");
        //add input and ok button to the previosly created div
        addHikerContainer.appendChild(inputField)
        addHikerContainer.appendChild(okButton)
            //append that and the add button to the container, above hikercontainer 
        container.appendChild(addButton)
        container.appendChild(addHikerContainer)

        //if addbutton is pressed, addhikercontainer style become flex
        addButton.addEventListener("click", () => {
            addHikerContainer.style.display = "flex"
        });
        //if i press the ok button, create element on screen with the name from the inout form and a class of "hiker", save it with his name and class, set this container display to "none", empty the inoput field for further use in the future
        okButton.addEventListener("click", () => {
            this.createElementOnScreen(inputField.value, "hiker");
            storage.save(inputField.value, new Person(inputField.value));
            addHikerContainer.style.display = "none";
            inputField.value = "";
        })

    }

    modifyEventListener(e) {
        //create an empty array
        const elementsToModify = [];
        //get the class/name of the div im working on
        const hikerName = e.target.className;

        //get the type(hiker or item)
        const type = e.target.parentNode.parentNode.className;

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
            document.getElementById(hikerName).appendChild(this.modifyHikerLayout(elementsToModify, hikerName, type))

        } else {
            //otherwise we are modifying an item, we get all the nodes and we select the last one were we will append the layout to modify the info
            const targetNodes = e.target.parentNode.parentNode.childNodes;
            targetNodes[targetNodes.length - 1].appendChild(this.modifyHikerLayout(elementsToModify, hikerName, type));
        }

    }

    modifyHikerLayout(elementsToModify, hikerName, type) {
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
            modifyHikerContainer.appendChild(this.addRemoveButton());

            //if clicked, send to storage.modify just the name and the value of the input
            okButton.addEventListener("click", () => {
                if (hikerName != inputField1.value) {
                    //if the values are different, then modify, otherwise it would remove the item by virtue of the modify method, which removes the old item when saving the new one
                    storage.modify(hikerName, /* undefined, */ undefined, inputField1.value);
                    this.load(); ///////////////HERE
                }
            });

        } else { //if there are items in elementstomodify, we assume is an item, we poplulate the div accordingly
            inputField1.value = elementsToModify[0].textContent
            inputField2.value = elementsToModify[1].textContent
            modifyHikerContainer.appendChild(inputField1);
            modifyHikerContainer.appendChild(inputField2);
            modifyHikerContainer.appendChild(okButton);
            modifyHikerContainer.appendChild(this.addRemoveButton());

            //if clicked, we send the name, elements to modify and the new values 
            okButton.addEventListener("click", () => {
                let input1 = document.getElementById("inputField1").value
                let input2 = document.getElementById("inputField2").value
                storage.modify(hikerName, /*type,*/ elementsToModify, [
                    [input1],
                    [input2]
                ])
                this.load(); ///////////////HERE
            })
        }

        //return a div to append
        return modifyHikerContainer;
    }

    /**gets the users from the localStorage and load them on screen// gets an array of elements from storage, for each element create a single element with the name, then append a new div on it with all the details*/
    loadHikers() {
        //gets all the items
        const stored = storage.load();
        stored.forEach(hiker => {
            //for each item, create the first div of hiker class and the  AMX buttons
            const addDiv = this.createElementOnScreen(hiker.name, "hiker");

            //for each items in the hiker.wardrobe
            for (let i = 0; i < hiker.wardrobe.length; i++) {

                //create an empty div and load a const with a ready to deploy class name, composed by the name and the wardrobe.name(to make each wardrobe item exclusive to the hiker)
                let wardrobeDiv = document.createElement("div");
                const hikerID = hiker.name + "_" + hiker.wardrobe[i].name;

                //if there isn't such div with the specific hikerclass name, we create one. its a div that will contain all the items of that type for that hiker
                if (document.getElementById(hikerID) === null) {

                    wardrobeDiv.setAttribute("id", hikerID)
                    wardrobeDiv.setAttribute("class", hiker.wardrobe[i].name)

                    wardrobeDiv.setAttribute("class", "panel"); /////////////here

                    wardrobeDiv.textContent = hiker.wardrobe[i].name;
                    wardrobeDiv.style.border = "1px solid orange";

                } else { //otherwise, we assume that the div with the classname has beel aready created, so we get it by Id
                    wardrobeDiv = document.getElementById(hikerID);
                }
                //we create a new div by passing [wardrobe.name, wardrobe.note], [item, hikername]
                let itemDiv = this.createElementOnScreen([
                    [hiker.wardrobe[i].set[0].name],
                    [hiker.wardrobe[i].set[0].note]
                ], [
                    ["item"],
                    [hiker.name]
                ])
                wardrobeDiv.appendChild(itemDiv); //append item in the collector div
                addDiv.appendChild(wardrobeDiv);
            }
            //append to main container
            // this.accordionDiv();
            hikerContainer.appendChild(addDiv);
        });
    }


    /**create a select element */
    createSelection(parentId) {
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
            if ( /*e.target.id == "confirm" &&*/ inputNote.value != "" && inputName.value != 0) {

                const name = parentId;
                const selectValue = wardrobe.value;
                const inputNameValue = inputName.value;
                const inputNoteValue = inputNote.value;

                const newDiv = document.createElement("div")
                newDiv.textContent = selectValue + ": " + inputNameValue + " // " + inputNoteValue;
                storage.saveB(name, [selectValue, inputNameValue, inputNoteValue]);
                newDiv.appendChild(this.addRemoveButton());
                document.getElementById(parentId).appendChild(newDiv)
                element.remove();

                inputName.value = inputNote.value = "";
            }
            this.load(); ///////////////HERE
        })

        element.appendChild(wardrobe);
        element.appendChild(inputName);
        element.appendChild(inputNote);
        element.appendChild(okButton);
        element.appendChild(this.addRemoveButton());

        return element;
    }


}