'use strict'

/** gets the element content, then i replace it with a new element with a new id, otherwise it wont load other pages properly */
function homePage () {
  const content = document.getElementById('content')
  const homeContent = document.createElement('div')
  homeContent.setAttribute('id', 'content')
  content.replaceWith(homeContent);

  /** create an h1, add a text and append */
  (() => { // IIFE(immediately invoked function expression) but anonymous
    const h1 = document.createElement('h1')
    h1.textContent = 'Welcome to the Wave Café'
    homeContent.appendChild(h1)
  })();

  /** create an image element, set an id and a src attribute, then append */
  (() => { // IIFE(immediately invoked function expression) but anonymous
    const image = document.createElement('img')
    image.setAttribute('id', 'homeImage')
    image.src = 'img/2.jpg'
    homeContent.appendChild(image)
  })()
}

export default homePage
