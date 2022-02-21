import Person from './Person'
import Wardrobe from './Wardrobe'
import Item from './Item'

export default class Storage {
    /** gets a key and a value to store in the localStorage */
    save(key, value) {
        /** set an item to localstorage by passing the key(name) and a value(an object) which has to be converted to string  */
        localStorage.setItem(key, JSON.stringify(value))
    }

    // storage.saveB(name, [WARDROBE, NAME, NOTE]);
    saveB(key, value) {
        // gets the item from the localstorage with that name and store locally in "a"
        const a = this.loadOne(key)

        // if the wardrobe contains this already (HEAD/BODY/SHOES etc)
        if (a.wardrobe === value[0]) {
            // push a new item at that address
            a.wardrobe[value[0]].push(new Item(value[1], value[2]))
        } else {
            // we assume the wardrobe item hasn't been found, add a new wardrobe item with nome and note of the new item
            a.wardrobe.push(new Wardrobe(value[0], new Item(value[1], value[2]))) // create a new wardrobe with items
        }
        this.save(key, a) // save to localStorage after modification
    }

    // modify the name of the hiker div, or the checkbox value, or the name/description of a single item. depending on the value passed it will switch his behaviour to accomodate the operation
    modify(name, keys, newValues) {
        const a = this.loadOne(name)

        if (keys === undefined) { // change the name, since not passing this argument means we are pointing at an hiker name
            a.name = newValues
            this.save(newValues, a)
            this.remove('a', name)
            return
        }
        if (newValues === true || newValues === false) { // change the checkbox value, as a boolean value is used only for checkbox
            a.wardrobe.forEach(element => {
                element.set.forEach(elem => {
                    if (elem.name == keys[0] && elem.note == keys[1]) {
                        elem.checkbox = newValues
                    }
                })
                this.save(name, a)
            })
        } else { // change an item description, as the keys as passed to describe which item is to be modified
            a.wardrobe.forEach(element => {
                element.set.forEach(elem => {
                    if (elem.name === keys[0].textContent) {
                        elem.name = newValues[0]
                        elem.note = newValues[1]
                    }
                })
                this.save(name, a)
            })
        }
    }

    /** load each element from the localStorage and return in an array. used in UI.loadHikers() to show on screen what we have stored */
    load() {
        const a = []
        if (localStorage.length === 0) {
            this.createDEMOElements()
        }
        for (let i = 0; i < localStorage.length; i++) {
            a.push(Object.assign(JSON.parse(localStorage.getItem(localStorage.key(i)))))
        }
        return a
    }

    createDEMOElements() {
        const Santi = new Person('Santi(Demo)', new Wardrobe('Top', new Item('Foldable hat', 'wide brim', true)))
        Santi.addWardobeItem('Top', 'Bandana', 'cotton', true)
        Santi.addWardobeItem('Body', 'Decathlon T-Shirt', 'easy dry', false)
        Santi.addWardobeItem('Body', 'Hoodie', 'for walking', true)
        Santi.addWardobeItem('Body', 'Hoodie', 'for resting', false)
        Santi.addWardobeItem('Bottom', 'Hiking Trowsers', 'can be long/shorts', false)
        Santi.addWardobeItem('Bottom', 'Shorts', 'for resting', true)
        Santi.addWardobeItem('Extra', 'Wireless speaker', '+cracked Spotify. remember phone data plan', false)
        localStorage.setItem(Santi.getName(), JSON.stringify(Santi))

        const Ennio = new Person('Ennio(Demo)', new Wardrobe('Top', new Item('baseball cap', 'x2', false)))
        localStorage.setItem(Ennio.getName(), JSON.stringify(Ennio))

        const Francesco = new Person('Francesco(Demo)', new Wardrobe('Shoes', new Item('hiking shoes', '', false)))
        this.save(Francesco.getName(), Francesco)

        const Alessio = new Person('Alessio(Demo)', new Wardrobe('Extra', new Item('External Charger', 'plus cables', true)))
        Alessio.addWardobeItem('Extra', 'Hiking poles', 'x2', true)
        this.save(Alessio.getName(), Alessio)
    }

    // DEBUG ONLY shows the entire content of localStorage
    consoleLogLocalStorage() {
        for (let i = 0; i < localStorage.length; i++) {
            const a = JSON.parse(localStorage.getItem(localStorage.key(i)))
            console.log(a)
        }
    }

    remove(type, key) {
        // Type A: removes an entire key/user from the local storage
        if (type === 'a') {
            localStorage.removeItem(key)
        }
        // Type B: remove an item from an hiker (TYPE,[hikername, itemnome,itemnote]
        if (type === 'b') {
            // load this hiker
            const a = this.loadOne(key[0])
                // cycle through all the wardrobe, keep an index
            a.wardrobe.forEach((element, index) => {
                // cycle on all the elements of that wardrobe
                element.set.forEach(elem => {
                    // if i find one of the element
                    if (elem.name === key[1]) {
                        // delete the weardrobe at the specified index
                        delete a.wardrobe[index]
                            // NOTE: doing this will leave an empty slot in the array (as in, items in the array =1, array.length==2, will console.log <1 empty slot> where the a.wardrobe[index] used to be), the solution is to filter the array for empty values as below. /

                        /** filter() calls a provided callbackFn function once for each element in an array, and constructs a new array of all the values for which callbackFn returns a value that coerces to true(truthy). callbackFn is invoked only for indexes of the array which have assigned values; it is not invoked for indexes which have been deleted or which have never been assigned values. Array elements which do not pass the callbackFn test are skipped, and are not included in the new array. */
                        a.wardrobe = a.wardrobe.filter(function(e) { return e })
                    }
                })
            })
            this.save(key[0], a)
        }
    }

    loadOne(name) {
        // probably unnecessary and could be done differently, but gets trought all the items and return the one we request
        for (let i = 0; i < localStorage.length; i++) {
            const a = JSON.parse(localStorage.getItem(localStorage.key(i)))
            if (name === a.name) return a
        }
        return 0
    }
}