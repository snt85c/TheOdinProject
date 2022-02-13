import Person from "./Person";
import Storage from "./Storage";

const container = document.getElementById("container");
const hikerContainer = document.getElementById("hikersContainer");

const storage = new Storage;

export default class UI {

    init() {
        this.createHiker();
        this.loadHikers();
    }

    /**single button that when clicked opens an input field and a submit button. add an element on screen below */
    createHiker() {
        const addHikerContainer = document.createElement("div");
        addHikerContainer.style.display = "none";

        let addButton = document.createElement("button")
        addButton.textContent = "Add a new Hiker";
        addButton.setAttribute("title", "click to add a new hiker");

        let okButton = document.createElement("button")
        okButton.textContent = "OK";
        okButton.setAttribute("title", "confirm name")

        let inputField = document.createElement("INPUT");
        inputField.setAttribute("type", "text");

        addHikerContainer.appendChild(inputField)
        addHikerContainer.appendChild(okButton)

        container.appendChild(addButton)
        container.appendChild(addHikerContainer)

        addButton.addEventListener("click", () => {
            addHikerContainer.style.display = "flex"
        });
        okButton.addEventListener("click", () => {
            this.createElementOnScreen(inputField.value);
            storage.save(inputField.value, new Person(inputField.value));
            addHikerContainer.style.display = "none";
            inputField.value = "";
        })

        document.addEventListener("click", (e) => {
            if (e.target.id == "addWardrobe") {
                e.target.parentElement.appendChild(this.createSelection(e.target.parentElement.id));
            }
        });
    }

    /**creates the basic block for each user */
    createElementOnScreen(key) {
        const div = document.createElement("div");
        div.setAttribute("id", key);
        div.setAttribute("class", "hiker");
        div.textContent = key;

        const addWardrobe = document.createElement("div");
        addWardrobe.setAttribute("id", "addWardrobe");
        addWardrobe.setAttribute("title", "add an element to the hiker");
        addWardrobe.textContent = "A";
        addWardrobe.style.float = "right";
        addWardrobe.style.display = "inline-block";

        div.appendChild(this.addRemoveButton());
        div.appendChild(addWardrobe);
        hikerContainer.appendChild(div);
    }

    addRemoveButton() {
        const remove = document.createElement("div");
        remove.textContent = "X";
        remove.setAttribute("id", "remove");
        remove.setAttribute("title", "close the tab");
        remove.style.float = "right";
        remove.style.display = "inline-block";

        document.addEventListener("click", (e) => {
            if (e.target.id == "remove" && e.target.parentElement.id == "item") {
                storage.remove(e.target.parentElement.class)
                console.log()
            }
            if (e.target.id == "remove") {
                e.target.parentElement.style.display = "none"
                storage.remove(e.target.parentElement.id)
            }
        });

        return remove;
    }

    /**gets the users from the localStorage and load them on screen// gets an array of elements from storage, for each element create a single element with the name, then append a new div on it with all the details*/
    loadHikers() {
        const stored = storage.load(); //array of hikers Object
        stored.forEach(hiker => {
            this.createElementOnScreen(hiker.name); //create the element with the name
            for (let i = 0; i < hiker.wardrobe.length; i++) { //loop trought wardrobe array in hiker.
                const div = document.createElement("div"); //create a div
                div.setAttribute("id", "item")
                div.setAttribute("class", hiker.wardrobe[i].set[0].name) //add a class to the div with the name of the item
                div.textContent = hiker.wardrobe[i].name + ": " + hiker.wardrobe[i].set[0].name + " // " + hiker.wardrobe[i].set[0].note; //populate
                div.appendChild(this.addRemoveButton()); //append
                const addDiv = document.getElementById(hiker.name); //given the main div is created on the method createlementonscreen, i have to call it back

                addDiv.appendChild(div); //final append
            }
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

        document.addEventListener("click", (e) => {
            if (e.target.id == "confirm" && inputNote.value != "" && inputName.value != 0) {

                const name = parentId;
                const selectValue = wardrobe.value;
                const inputNameValue = inputName.value;
                const inputNoteValue = inputNote.value;

                const newDiv = document.createElement("div")
                newDiv.textContent = selectValue + ": " + inputNameValue + " // " + inputNoteValue;
                // save(key, value) {
                //     // localStorage.setItem(key, JSON.stringify(value));
                // }

                // addWardobeItem(set, name, note) {
                //     this.wardrobe.push((new Wardrobe(set, new Item(name, note))))
                // }
                // console.log(name);
                storage.saveB(name, [selectValue, inputNameValue, inputNoteValue]);
                newDiv.appendChild(this.addRemoveButton());
                document.getElementById(parentId).appendChild(newDiv)
                element.remove();

                inputName.value = inputNote.value = "";
            }
        })


        element.appendChild(wardrobe);
        element.appendChild(inputName);
        element.appendChild(inputNote);
        element.appendChild(okButton);
        element.appendChild(this.addRemoveButton());

        return element;
    }


}