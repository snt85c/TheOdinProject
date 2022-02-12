export default class Storage {

    /**gets a key and a value to store in the localStorage */
    save(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    /**load each element from the localStorage */
    load() {
        const a = [];
        for (let i = 0; i < localStorage.length; i++) {
            a.push(Object.assign(JSON.parse(localStorage.getItem(localStorage.key(i)))));
        }
        return a;
    }

    remove(key) {
        localStorage.removeItem(key);
        this.load();
    }
}