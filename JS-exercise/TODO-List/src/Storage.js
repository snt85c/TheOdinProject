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
        this.consoleLogLocalStorage();
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

    // save(key, value) {
    //     localStorage.setItem(key, JSON.stringify(value));
    //     console.log("saveA")
    //     this.consoleLogLocalStorage();
    //     this.load()
    // }

    // saveB(key, value) {
    //     const a = this.loadOne(key); //gets the item from the localstorage with that name and store locally in "a"
    //     if (a.wardrobe == value[0]) {
    //         a.wardrobe[value[0]].push(new Item(value[1], value[2]));
    //     } else {
    //         a.wardrobe.push(new Wardrobe(value[0], new Item(value[1], value[2]))); //create a new wardrobe with items
    //         this.save(key, a); //save to localStorage after modification
    //     }
    //     console.log("saveB")
    //     this.consoleLogLocalStorage();
    //     this.load()

    // }

    modify(name, type, keys) {
        if (type == undefined && keys == undefined) { //change the name
            const a = this.loadOne(name)
                // a.name = "Santi"
                // console.log(a.name);
        } else { //change an item description
            // console.log(name)
            // console.log(type)
            // console.log(keys);
        }
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

    remove(key) {
        localStorage.removeItem(key);
        this.load();
    }

    loadOne(name) {
        for (let i = 0; i < localStorage.length; i++) {
            const a = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if (a.name === name) return a;
        }
        return -1;
    }

}