const getTheTitles = function(books) {
    const result = books.map(book => {
        return book.title;
    })
    return result;
};

// Do not edit below this line
module.exports = getTheTitles;