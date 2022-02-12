import Person from "./Person";
import Storage from "./Storage";

const container = document.getElementById("container");
const hikerContainer = document.getElementById("hikersContainer");

const storage = new Storage;

export default class UI {

    init() {
        this.createHiker();
        this.loadHikers();

        document.addEventListener("click", (e) => {
            if (e.target.id == "remove") {
                e.target.parentElement.style.display = "none"
                storage.remove(e.target.parentElement.id)
            }
        });
    }


    createHiker() {
        const addHikerContainer = document.createElement("div");
        addHikerContainer.style.display = "none";

        let button = document.createElement("button")
        button.textContent = "Add a new Hiker";

        let button2 = document.createElement("button")
        button2.textContent = "OK";

        let input = document.createElement("INPUT");
        input.setAttribute("type", "text");

        addHikerContainer.appendChild(input)
        addHikerContainer.appendChild(button2)

        container.appendChild(button)
        container.appendChild(addHikerContainer)

        button.addEventListener("click", () => {
            addHikerContainer.style.display = "flex"
        });
        button2.addEventListener("click", () => {
            this.createElementOnScreen(input.value);
            storage.save(input.value, new Person(input.value));
            addHikerContainer.style.display = "none";
            input.value = "";
        })
    }

    createElementOnScreen(key) {
        const div = document.createElement("div")
        div.setAttribute("id", key);
        div.setAttribute("class", "hiker");
        div.textContent = key;
        const remove = document.createElement("div");
        remove.textContent = "X"
        remove.setAttribute("id", "remove")
        remove.style.float = "right"
        remove.style.display = "inline-block"

        div.appendChild(remove)
        hikerContainer.appendChild(div);
    }

    loadHikers() {
        const stored = storage.load();
        stored.forEach(hiker => {
            this.createElementOnScreen(hiker.name);
        });
    }

    createSelection() {

        const element = document.createElement("div");
        element.setAttribute("id", "element");

        const name = document.createElement("div");
        const wardrobe = document.createElement("select");
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

        element.appendChild(name);
        element.appendChild(wardrobe);

        container.appendChild(element);
    }


}