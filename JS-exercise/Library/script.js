const addOverlay = document.getElementById("addOverlay");
const removeOverlay = document.getElementById("removeOverlay");
const container = document.getElementById("library");

const library = [];

function Book(title, author, pages, language, published) {
    this.title = title === "" ? "Unknown" : title;
    this.author = author
    this.pages = pages
    this.language = language
    this.published = published

}

document.addEventListener("click", (e) => {

    if (e.target.id == "newBookButton") {
        toggleAddOverlay();
    }
    if (e.target.id == "removeButton") {
        toggleRemoveOverlay();
    }
    if (e.target.id == "submit") {
        checkLibrary()
    }
    if (e.target.id == "clear") {
        clear();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key == "Enter" && addOverlay.style.display == "flex") {
        checkLibrary()
    }
    if (e.key == "+" && addOverlay.style.display == "none") {
        toggleAddOverlay();
    }
});

function checkLibrary() {
    let notFound = true;
    const title = document.getElementById("newTitle");

    library.every(book => {
        if (book.title === title.value) {
            alert("dupicate");
            console.log("duplicate")
            notFound = false;
            return;
        }
    });
    if (notFound) {
        addNewBook();
    }

}

function toggleAddOverlay() {
    if (addOverlay.style.display == "flex") {
        addOverlay.style.display = "none";
    } else {
        addOverlay.style.display = "flex"
        removeOverlay.style.display = "none"
    }
}

function toggleRemoveOverlay() {
    if (removeOverlay.style.display == "flex") {
        removeOverlay.style.display = "none"
    } else {
        removeOverlay.style.display = "flex"
        addOverlay.style.display = "none"
        removeAbook();
    }
}

function clear() {
    let title = document.getElementById("newTitle");
    let author = document.getElementById("newAuthor");
    let pages = document.getElementById("newPages");
    let language = document.getElementById("newLanguage");
    let published = document.getElementById("newPublished");
    title.value = author.value = pages.value = language.value = published.value = "";
}

function addNewBook() {
    let title = document.getElementById("newTitle");
    let author = document.getElementById("newAuthor");
    let pages = document.getElementById("newPages");
    let language = document.getElementById("newLanguage");
    let published = document.getElementById("newPublished");

    library.push(new Book(title.value, author.value, pages.value, language.value, published.value));
    console.table(library)
    createBooksOnContainer();
    toggleAddOverlay();

}

function createBooksOnContainer() {
    container.textContent = "";
    library.forEach(book => {

        const div = document.createElement("div");
        div.classList.add("bookStyle");

        const newtitle = document.createElement("span")
        const newauthor = document.createElement("span")
        const newpages = document.createElement("span")
        const newlanguage = document.createElement("span")
        const newpublished = document.createElement("span")

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
    })
}

function listInRemoveOverlay() {
    removeOverlay.textContent = "Remove a book:";
    library.forEach(book => {
        const div = document.createElement("div");
        div.textContent = book.title;
        removeOverlay.appendChild(div);
    });
}

function removeAbook() {
    let toBeRemoved = "";
    let indexToBeRemoved = 1000;
    listInRemoveOverlay();
    removeOverlay.addEventListener("click", (e) => {
        toBeRemoved = e.target.textContent;
        for (let i = 0; i < library.length; i++) {
            if (library[i].title === toBeRemoved) {
                indexToBeRemoved = i;
            }
        }
        library.splice(indexToBeRemoved, 1);
        createBooksOnContainer();
        listInRemoveOverlay();
    })
}

// clear();