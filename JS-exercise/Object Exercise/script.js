const text = document.getElementById("show");

function Book(name, author) {
    this.name = name
    this.author = author
    this.descr = function() {
        return this.name + " " + this.author;
    }
}
const book1 = new Book("tom", "riddle");
console.log(book1.descr());
text.textContent = book1.descr();