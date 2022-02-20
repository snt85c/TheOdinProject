
function menuPage () {
  const content = document.getElementById('content')
  const menuContent = document.createElement('div')
  menuContent.setAttribute('id', 'content')
  content.replaceWith(menuContent)

  /** create a container for the menu objects */
  const menu = document.createElement('div')
  menu.setAttribute('id', 'menu');

  (function item1 () {
    const item1 = document.createElement('div')
    item1.setAttribute('id', 'menuItem')
    const item1div1 = document.createElement('div')
    const item1div2 = document.createElement('div')
    item1div2.setAttribute('id', 'itemDiv')
    item1div2.textContent = "Agent Cooper's Favourite - £3.50"
    const image1 = document.createElement('img')
    image1.src = 'img/coffee.png'
    image1.setAttribute('id', 'menuImage')

    item1div1.appendChild(image1)
    item1.appendChild(item1div1)
    item1.appendChild(item1div2)
    menu.appendChild(item1)
  })();

  (function item2 () {
    const item2 = document.createElement('div')
    item2.setAttribute('id', 'menuItem')
    const item2div1 = document.createElement('div')
    const item2div2 = document.createElement('div')
    item2div2.setAttribute('id', 'itemDiv')
    item2div2.textContent = 'The Darkest Coffee - £3.00'
    const image2 = document.createElement('img')
    image2.src = 'img/coffee.png'
    image2.setAttribute('id', 'menuImage')

    item2.appendChild(image2)
    item2.appendChild(item2div1)
    item2.appendChild(item2div2)
    menu.appendChild(item2)
  })();

  (function item3 () {
    const item3 = document.createElement('div')
    item3.setAttribute('id', 'menuItem')
    const image3 = document.createElement('img')
    image3.src = 'img/coffee.png'
    image3.setAttribute('id', 'menuImage')
    item3.appendChild(image3)
    menu.appendChild(item3)
  })();

  (function item4 () {
    const item4 = document.createElement('div')
    item4.setAttribute('id', 'menuItem')
    const image4 = document.createElement('img')
    image4.src = 'img/coffee.png'
    image4.setAttribute('id', 'menuImage')
    item4.appendChild(image4)
    menu.appendChild(item4)
  })()

  menuContent.appendChild(menu)
}

export default menuPage
