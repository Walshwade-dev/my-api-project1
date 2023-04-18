
// A book management API project

const database = require('./database');
const express = require('express');


// Initialising Express.js
const app = express();


/*                                                           GET method 
                                        (to retrieve existing items in the database.)
*/

// GET method to get all the books available in the database.

/*
    Route:           /books
    Description:    Get all the books
    Access:         PUBLIC
    method:         GET
    parameter:      none
*/

app.get('/books', (req, res) => {
    res.json({books: database.books});
});



// GET method to get a specific book based on the ISBN.
/*
    Route:           /books/:isbn
    Description:    Get all the books matching a given isbn number
    Access:         PUBLIC
    method:         GET
    parameter:      isbn
*/

app.get("/books/Is/:isbn", (req, res) => {
    const getSpecificBook = database.books.filter((book) => book.ISBN === req.params.isbn);

    if( getSpecificBook.length === 0){
        return res.json({error: `There is no book matching the given isbn number ${req.params.isbn}.`});
    }

    return res.json({books: getSpecificBook});
})



// GET method to get a list of books based on a category.
/*
    Route:           /books/c/:category
    Description:    Get a list of books based on a category
    Access:         PUBLIC
    method:         GET
    parameter:      category
*/

app.get("/books/c/:category", (req, res) => {
    const getSpecificCategory = database.books.filter((book) => {
        return book.category.includes(req.params.category);
    });

    if( getSpecificCategory.length === 0){
        return res.json({error: `There is no book matching the given category of ${req.params.category}.`});
    }

    return res.json({books: getSpecificCategory});
});


// Get a list of books based on a language.

/*
    Route:           /books/lang/
    Description:    Get a list of books based on the language written in.
    Access:         PUBLIC
    method:         GET
    parameter:      language
*/

app.get('/books/lang/:language', (req, res) => {
    const getSpecificBook = database.books.filter((book) => {
        return book.language.includes(req.params.language);
    });

    if( getSpecificBook.length === 0){
        return res.json({error: `There is no book matching the given category of ${req.params.language}.`});
    }

    return res.json({book: getSpecificBook});
});





//                  2. AUTHORS.
/*
    Route:              /author
    Description:        Get all authors
    Access:             PUBLIC
    Parameter:          none
    Methods:            GET
 */


app.get("/authors", (req, res) => {
    return res.json({authors: database.author});
});



/*
    Route:              /author/id/:Id
    Description:        Get a specific author based on the id
    Access:             PUBLIC
    Parameter:          id
    Methods:            GET
 */



app.get("/author/id/:id", (req, res) => {
    const getSpecificAuthor = database.author.filter((author) => (author.id === parseInt(req.params.id)));

    return res.json({author: getSpecificAuthor});
});



/*
    Route:              /author/book/:isbn
    Description:        Get all authors based on books
    Access:             PUBLIC
    Parameter:          isbn
    Methods:            GET
 */

app.get("/author/book/:isbn", (req, res) => {
    const getSpecificAuthor = database.author.filter((author) => author.books.includes(req.params.isbn));

    if( getSpecificAuthor.length === 0){
        return res.json({error: `There is no author matching the given book of ${req.params.isbn}.`});
    }

    return res.json({author: getSpecificAuthor});
})


//                              3. PUBLICATIONS;

// get all the publications.  

/*
    Route:              /publications
    Description:        Get all publications
    Access:             PUBLIC
    Parameter:          none
    Methods:            GET
 */

app.get("/publications", (req, res) => {
    res.json({Publications: database.publication});
});


// get a specific publications.

/*
    Route:              /publications/
    Description:        Get a specific publications
    Access:             PUBLIC
    Parameter:          id
    Methods:            GET
 */


app.get("/publications/:id", (req, res) => {
    const getSpecificPublication = database.publication.filter((publication) => publication.id === parseInt(req.params.id));

    if (getSpecificPublication.length === 0){
        return res.json({error: `No publication found to match the given id: ${req.params.id}`});
    };

    return res.json({Publication: getSpecificPublication});
});




// get a list of publications based on a book.

/*
    Route:              /publications/book/
    Description:        Get a list of publications based on a book.
    Access:             PUBLIC
    Parameter:          isbn
    Methods:            GET
 */


app.get("/publications/book/:isbn", (req, res) => {
    const getSpecificPublication = database.publication.filter((publication) => publication.books.includes(req.params.isbn));

    if (getSpecificPublication.length === 0){
        return res.json({error: `No publication found to match the given book of isbn: ${req.params.isbn}`});
    };

    return res.json({publication: getSpecificPublication});
});

app.listen(3000, () => {
    console.log(`Server is up and running at port ${3000}`);
});