"use strict"
//dangerzone//
// localStorage.clear();
//dangerzone//
import Storage from "./Storage";
import Wardrobe from "./Wardrobe";
import Item from "./Item";
import Person from "./Person";
import UI from "./UI";

const storage = new Storage;
const ui = new UI;
ui.init();
// storage.save(new Person(ui.createButton()));
// console.log(localStorage)
// ui.createSelection();


// const santi = new Person("Santi", new Wardrobe("TOP", new Item("Hat", "foldable")));
// santi.addWardobeItem("TOP", "Glasses", "Swag");
// santi.addWardobeItem("TOP", "scruffy beard", "veteran look")
// santi.getWardrobeItem("TOP")
// santi.addWardobeItem("BODY", "t-shirt", "4 items max")
// santi.getAllWardrobeForPerson();


// const ennio = new Person("Ennio");
// ennio.addWardobeItem("BOTTOM", "Trousers", "Decathlon convertible")
// ennio.getAllWardrobeForPerson();

// const alessio = new Person("Alessio");
// alessio.addWardobeItem("TOP", "none", "none")
// alessio.addWardobeItem("BODY", "decathlon t-shirts", "4 pairs");
// alessio.addWardobeItem("BOTTOM", "Trousers", "Decathlon convertible")
// alessio.addWardobeItem("SHOES", "Adidad TERREX SWIFT GTR R2", "pretty cool shoes my dude")
// alessio.getAllWardrobeForPerson();

// storage.save(santi);
// storage.load(santi);