export default class Wardrobe {

    constructor(name, item) {
        this.name = name;
        this.set = [];
        this.set.push(item);
    }

    addItem(item) {
        this.set.push(item);
    }
}