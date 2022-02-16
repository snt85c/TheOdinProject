import Person from "./Person";
import Wardrobe from "./Wardrobe";
import Item from "./Item";

export default class Storage {

    /**gets a key and a value to store in the localStorage 
     * / storage.save(MODE, NAME, [WARDROBEPART, NAMEITEM, NOTEITEM]);
     */
    save(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
        console.log("saveA")
            // this.consoleLogLocalStorage();
    }

    saveB(key, value) {
        const a = this.loadOne(key); //gets the item from the localstorage with that name and store locally in "a"
        if (a.wardrobe == value[0]) {
            a.wardrobe[value[0]].push(new Item(value[1], value[2]));
        } else {
            a.wardrobe.push(new Wardrobe(value[0], new Item(value[1], value[2]))); //create a new wardrobe with items
            this.save(key, a); //save to localStorage after modification
        }
        console.log("saveB")
        this.consoleLogLocalStorage();
    }

    modify(name, type, keys, newValues) { //SOMEHOW, MODIFIYNG THE NAME MAKES IT UNDELETABLE. IT WONT FIND THE ELEMENT IN STORAGE WITH THE NAME, MAYBE IS AN ORDER ISSUE? IT LOADS BEFORE/AFTER SOMETHING. FIND THIS BUG

        console.log(name)
        if (type == undefined && keys == undefined) { //change the name
            const a = this.loadOne(name)
                // console.log(a.name)
            a.name = newValues;
            this.save(newValues, a);
            console.log("modify")
        } else { //change an item description
            const a = this.loadOne(name)
            a.wardrobe.forEach(element => {
                element.set.forEach(elem => {
                    if (elem.name == keys[0].textContent) {
                        elem.name = newValues[0];
                        elem.note = newValues[1];
                    }
                })
                this.save(name, a);
            });
        }
        this.remove("a", name)
    }

    /**load each element from the localStorage */
    load() {
        const a = [];
        for (let i = 0; i < localStorage.length; i++) {
            a.push(Object.assign(JSON.parse(localStorage.getItem(localStorage.key(i)))));
        }
        return a;
    }

    consoleLogLocalStorage() {
        // console.clear();
        for (let i = 0; i < localStorage.length; i++) {
            const a = JSON.parse(localStorage.getItem(localStorage.key(i)))
            console.log(a);
        }
    }

    remove(type, key) {
        if (type == "a") {
            console.log(key)
            localStorage.removeItem(key);
            this.consoleLogLocalStorage();
            console.log("remove A")

        }
        if (type == "b") {
            console.log("remove B")
        }
    }

    loadOne(name) {
        for (let i = 0; i < localStorage.length; i++) {
            const a = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if (name == a.name) return a;

        }
        return 0;
    }

}