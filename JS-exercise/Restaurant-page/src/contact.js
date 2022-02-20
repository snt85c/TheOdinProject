'use strict'

function contactPage () {
  const content = document.getElementById('content')
  const contactPageContent = document.createElement('div')
  contactPageContent.setAttribute('id', 'content')
  content.replaceWith(contactPageContent);

  (function createH1 () {
    const h1 = document.createElement('h1')
    h1.textContent = 'Where to find us'
    h1.style.margin = '10px'
    contactPageContent.appendChild(h1)
  })();

  /** adds a map to the content area: this is done by using the "share" option on googlemaps on the "Embed a map" tab. the frame is added dinamically, the attributes are added one by one */
  (function addMaptoContact () {
    const iframe = document.createElement('iframe')
    iframe.classList.add('iframe-placeholder')
    iframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5805.965838280517!2d-8.613770365392105!3d43.314616994783556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xfe0189b5b79e93a9!2zNDPCsDE4JzUyLjYiTiA4wrAzNiczMy44Ilc!5e0!3m2!1sen!2suk!4v1644062439189!5m2!1sen!2suk'
    iframe.width = '75%'
    iframe.height = '75%'
    iframe.style = 'border:0'
    iframe.allowfullscreen = ''
    iframe.loading = 'lazy'
    iframe.style.borderRadius = '2%'
    contactPageContent.appendChild(iframe)
  })()
}

export default contactPage
