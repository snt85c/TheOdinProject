export default class Wardrobe {

    constructor(name, item) {
        this.name = name;
        // this.wardrobe = item;
        this.items = [];
        this.items.push(item);
        // this.item = item;
    }

    addItem(item) {
        this.items.push(item);
    }

    getItems() {
        return this.items;
    }
}