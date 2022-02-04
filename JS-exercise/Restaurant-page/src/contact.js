"use strict"



function contactPage(content) {
    console.log("contactpage")
    content.textContent = "";

    const map = document.createElement("div");
    map.setAttribute("id", "map");
    // map.style.width = "100%";
    // map.style.height = "400px";
    // map.style.backgroundColor = "crimson"
    map.textContent = "contact";
    content.replaceWith(map);

    const script = document.createElement("script");
    script.setAttribute("src", "https://maps.googleapis.com/maps/api/js?key=AIzaSyC8EgHdzTrcve3poFlYqZwR6CV7sip69dQ&callback=initMap&libraries=&v=weekly async")
        // script.innerHTML = 'src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC8EgHdzTrcve3poFlYqZwR6CV7sip69dQ&callback=initMap&libraries=&v=weekly" async'
    document.head.appendChild(script)
}

function initMap() {
    // The location of Uluru
    const uluru = { lat: -25.344, lng: 131.036 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
    });
}




export default contactPage;