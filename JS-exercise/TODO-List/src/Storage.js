export default class Storage {
    save(data) {
        localStorage.setItem(data.name, JSON.stringify(data));
    }
    load() {
        const container = document.getElementById("1");
        for (let i = 0; i < localStorage.length; i++) {
            const addDiv = document.createElement("div");
            const hiker = Object.assign(JSON.parse(localStorage.getItem(localStorage.key(i))));
            addDiv.textContent = ` Hiker: ${hiker.name} clothing: ${hiker.wardrobe.name}`
                // console.log(hiker.wardrobe.items.length);
            for (let j = 0; j < hiker.wardrobe.items.length; j++) {
                addDiv.textContent += `details: ${hiker.wardrobe.items[j].name}: ${hiker.wardrobe.items[j].note} `;
            }
            container.appendChild(addDiv);
        }
    }
}
console.log(localStorage)