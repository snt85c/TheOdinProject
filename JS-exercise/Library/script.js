/**START ASSIGNATION VARIABLES AND DOM ELEMENTS----------- */
const addOverlay = document.getElementById("addOverlay");
const removeOverlay = document.getElementById("removeOverlay");
const container = document.getElementById("library");
const removeOverlayContainer = document.getElementById("removeOverlayContainer");

/**creates elements for the overlays and a container where we show the books in the main page */

const library = [];

/**BOOK CONSTRUCTOR--------------------------------------------------------------- */

function Book(title, author, pages, language, published) {
  this.title = title === "" ? "Unknown" : title;
  this.author = author;
  this.pages = pages;
  this.language = language;
  this.published = published;
  /**constructor for the Book. if the title is left empty, it will replace the value with Unknown, otherwise we cant select the book on remove since there is nothign to click on */
}
/**EVENT LISTENER FOR MOUSE--------------------------------------------------------------- */

document.addEventListener("click", (e) => {
  if (e.target.id == "newBookButton") {
    toggleAddOverlay();
  }
  if (e.target.id == "removeButton") {
    toggleRemoveOverlay();
  }
  if (e.target.id == "submit") {
    checkLibrary();
  }
  if (e.target.id == "clear") {
    clear();
  }
  if (e.target.id == "closeRemoveOverlay") {
    removeOverlay.style.display = "none";
  }
  if (e.target.id == "closeAddOverlay") {
    addOverlay.style.display = "none";
  }
  /**if i click +, toggle the newBookOverlay. if i click -, toggle the removeBookOverlay etc*/
});
/**EVENT LISTENER FOR KEYBOARD--------------------------------------------------------------- */

document.addEventListener("keydown", (e) => {
  if (e.key == "Enter" && addOverlay.style.display == "flex") {
    checkLibrary();
  }
  if (e.key == "+" && addOverlay.style.display == "none") {
    toggleAddOverlay();
  }
  /**to facilitate entering books while debugging */
});

/**EVENT LISTENER FORM VALIDATION --------------------------------------------------------------- */




/**TOGGLE FUNCTIONS BETWEEN OVERLAYS--------------------------------------------------------------- */

/**turns on and off the ADD BOOK OVERLAY */
function toggleAddOverlay() {
  if (addOverlay.style.display == "flex") {
    addOverlay.style.display = "none";
  } else {
    addOverlay.style.display = "flex";
    removeOverlay.style.display = "none";
  }
}

/**turns on and off the REMOVE BOOK OVERLAY */
function toggleRemoveOverlay() {
  if (removeOverlay.style.display == "flex") {
    removeOverlay.style.display = "none";
  } else {
    removeOverlay.style.display = "flex";
    addOverlay.style.display = "none";
    removeAbook();
  }
}
/**MOVE THE OVERLAY WITH THE MOUSE--------------------------------------------------------------- */

var offset = [0, 0];
var isDown = false;

addOverlay.addEventListener(
  "mousedown",
  function (e) {
    isDown = true;
    offset = [
      addOverlay.offsetLeft - e.clientX,
      addOverlay.offsetTop - e.clientY,
    ];
  },
  true
);

removeOverlay.addEventListener(
  "mousedown",
  function (e) {
    isDown = true;
    offset = [
      removeOverlay.offsetLeft - e.clientX,
      removeOverlay.offsetTop - e.clientY,
    ];
  },
  true
);

document.addEventListener(
  "mouseup",
  function () {
    isDown = false;
  },
  true
);

document.addEventListener(
  "mousemove",
  function (e) {
    e.preventDefault();
    if (isDown) {
      addOverlay.style.left = e.clientX + offset[0] + "px";
      addOverlay.style.top = e.clientY + offset[1] + "px";
      removeOverlay.style.left = e.clientX + offset[0] + "px";
      removeOverlay.style.top = e.clientY + offset[1] + "px";
    }
  },
  true
);

/**ADD OVERLAY OPERATION--------------------------------------------------------------- */

/**gets all the elements that are in need for a reset, then applies an empty value */
function clear() {
  let title = document.getElementById("newTitle");
  let author = document.getElementById("newAuthor");
  let pages = document.getElementById("newPages");
  let language = document.getElementById("newLanguage");
  let published = document.getElementById("newPublished");
  title.value =
    author.value =
    pages.value =
    language.value =
    published.value =
      "";
}

/**checks the library Array for duplicates before allowing the addNewBook method */
function checkLibrary() {
  let notFound = true;
  const title = document.getElementById("newTitle");

  library.every((book) => {
    if (book.title === title.value) {
      alert("dupicate");
      console.log("duplicate");
      notFound = false;
      return;
    }
  });
  if (notFound) {
    addNewBook();
    clear();
  }
  /**checks the title in the addOverlay against the library, if not found it executes a method to add a new Book object in the library array */
}

/** add a Book object in the Library Array*/
function addNewBook() {
  let title = document.getElementById("newTitle");
  let author = document.getElementById("newAuthor");
  let pages = document.getElementById("newPages");
  let language = document.getElementById("newLanguage");
  let published = document.getElementById("newPublished");

  //THIS IS WHERE FORM VALIDATION SHOULD GO

  library.push(
    new Book(
      title.value,
      author.value,
      pages.value,
      language.value,
      published.value
    )
  );

  createBooksOnContainer();
  toggleAddOverlay();
  /**gets all the info from the DOM elements, then creates a new object with those value and pushes it into the array. in the end re-create the library container to show the new addition and closes the addOverlay */
}

/**populate the webpage with elements of the Library Array */
function createBooksOnContainer() {
  container.textContent = "";
  library.forEach((book) => {
    const div = document.createElement("div");
    div.classList.add("bookStyle");

    const newtitle = document.createElement("span");
    const newauthor = document.createElement("span");
    const newpages = document.createElement("span");
    const newlanguage = document.createElement("span");
    const newpublished = document.createElement("span");

    newtitle.classList.add("bookItem");
    newauthor.classList.add("bookItem");
    newpages.classList.add("bookItem");
    newlanguage.classList.add("bookItem");
    newpublished.classList.add("bookItem");

    newtitle.textContent = "Title: " + book.title;
    newauthor.textContent = "Author: " + book.author;
    newpages.textContent = "Pages: " + book.pages;
    newlanguage.textContent = "Language: " + book.language;
    newpublished.textContent = "Published: " + book.published;

    div.appendChild(newtitle);
    div.appendChild(newauthor);
    div.appendChild(newpages);
    div.appendChild(newlanguage);
    div.appendChild(newpublished);

    container.appendChild(div);
    /**resets the container to avoid duplications.for each book in the library create a  div where i will append all the elements, i also add a class for css, creates spans element to add in the div later, add a css class to the created span elements,add a text content plus the value requested, append all the span to the div ,append the div to the main container */
  });
}

/**REMOVE OVERLAY OPERATIONS--------------------------------------------------------------- */

/**creates a list of books just by title on the removeOverlay */
function listInRemoveOverlayContainer() {
  removeOverlayContainer.textContent = "";

  library.forEach((book) => {
    const div = document.createElement("div");
    div.textContent = book.title;
    removeOverlayContainer.appendChild(div);
    /**clears it to avoid duplication,for each book in the library, create a div, modifu the text content to the name on the book only, then append to the remove container */
  });
}

/** removes the book based on the title clicked*/
function removeAbook() {
  let toBeRemoved = "";
  let indexToBeRemoved = 1000;
  listInRemoveOverlayContainer();
  removeOverlayContainer.addEventListener("click", (e) => {
    toBeRemoved = e.target.textContent;
    for (let i = 0; i < library.length; i++) {
      if (library[i].title === toBeRemoved) {
        indexToBeRemoved = i;
      }
    }
    library.splice(indexToBeRemoved, 1);
    createBooksOnContainer();
    listInRemoveOverlayContainer();
  });
  /**create a variable to store the title of the book i want to remove and one for the index, initialized to a non easily reachable amount for the scope of the exercise. */
}

clear(); /**clear all the values in addOverlay at beginning */
