import Wardrobe from './Wardrobe'
import Item from './Item'

export default class Person {
  constructor (name, wardrobe) {
    this.name = name // unique name of the person
    this.wardrobe = [] // set of wardrobe, divided by bodyparts // eg: TOP, nome, note, checked
    if (wardrobe !== undefined) { // adds value of wardrobe only if passed as a method and is not undefined. JS doesnt allow overloading of constructor, so we have to check if the value is passed or not.
      this.wardrobe.push(wardrobe) // push the value in the constructor inside the array
    }
  }

  getName () {
    return this.name
  }

  addWardobeItem (set, name, note, checked) {
    this.wardrobe.push((new Wardrobe(set, new Item(name, note, checked))))
  }

  getWardrobeItem (a) {
    console.log(a)
    this.wardrobe.forEach(item => {
      if (a === item.name) {
        item.set.forEach(a => { console.log(`the item/s you were looking for is: ${a.name} note:${a.note} `) })
      } else {
        console.log(`no items found under the name ${a}`)
      }
    })
  }

  getAllWardrobeForPerson () {
    if (this.wardrobe === []) {
      console.log('no items to show')
      return
    }

    this.wardrobe.forEach(item => {
      item.set.forEach(set => {
        console.log(`${item.name} name: ${set.name}. note: ${set.note}.`)
      })
    })
  }
}
