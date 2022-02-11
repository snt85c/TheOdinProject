"use strict"
//dangerzone//
localStorage.clear();
//dangerzone//
import Storage from "./Storage";
import Wardrobe from "./Wardrobe";
import Item from "./Item";
import Person from "./Person";

const storage = new Storage;

const santi = new Person("Santi", new Wardrobe("TOP", new Item("Decathlon cazzo", "convertible to mazzo")));
console.log(santi)
santi.wardrobe.addItem(new Item("Decathlon Shirt", "4 pairs"))
storage.save(santi);

const ennio = new Person("Ennio", new Wardrobe("BOTTOM", new Item("Decathlon Trousers", "convertible to short")));
ennio.wardrobe.addItem(new Item("belt", "adjustable"));
ennio.wardrobe.addItem(new Item("underwear", "3 pairs"));
storage.save(ennio);
storage.load();