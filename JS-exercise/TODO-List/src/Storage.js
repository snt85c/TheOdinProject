import Person from "./Person";
import Wardrobe from "./Wardrobe";
import Item from "./Item";

export default class Storage {

    /**gets a key and a value to store in the localStorage */
    save(key, value) {
        /**set an item to localstorage by passing the key(name) and a value(an object) which has to be converted to string  */
        localStorage.setItem(key, JSON.stringify(value));
        console.log("saveA")
            // this.consoleLogLocalStorage();
    }


    // storage.saveB(name, [WARDROBE, NAME, NOTE]);
    saveB(key, value) {
        //gets the item from the localstorage with that name and store locally in "a"
        const a = this.loadOne(key);

        //if the wardrobe contains this already (HEAD/BODY/SHOES etc)
        if (a.wardrobe == value[0]) {

            //push a new item at that address 
            a.wardrobe[value[0]].push(new Item(value[1], value[2]));
        } else {
            //we assume the wardrobe item hasn't been found, add a new wardrobe item with nome and note of the new item 
            a.wardrobe.push(new Wardrobe(value[0], new Item(value[1], value[2]))); //create a new wardrobe with items
        }
        this.save(key, a); //save to localStorage after modification
        console.log("saveB")
        this.consoleLogLocalStorage();
    }

    modify(name, /* type,*/ keys, newValues) {
        console.log(name)
        if ( /*type == undefined &&*/ keys == undefined) { //change the name
            const a = this.loadOne(name)
                // console.log(a.name)
            a.name = newValues;
            this.save(newValues, a);
            this.remove("a", name)
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
    }

    /**load each element from the localStorage and return in an array. used in UI.loadHikers() to show on screen what we have stored */
    load() {
        const a = [];
        for (let i = 0; i < localStorage.length; i++) {
            a.push(Object.assign(JSON.parse(localStorage.getItem(localStorage.key(i)))));
        }
        // console.log(a)
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
        //Type A: removes an entire key/user from the local storage
        if (type == "a") {
            localStorage.removeItem(key);
            this.consoleLogLocalStorage();
            console.log("remove A")

        }
        //Type B: remove an item from an hiker//TO BE IMPLEMENTED YET
        if (type == "b") {
            console.log("remove B")
        }
    }

    loadOne(name) {
        //probably unnecessary and could be done differently, but gets trought all the items and return the one we request
        for (let i = 0; i < localStorage.length; i++) {
            const a = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if (name == a.name) return a;

        }
        return 0;
    }

}