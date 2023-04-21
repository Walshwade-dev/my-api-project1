
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



/**************************************** POST Request ****************************************************************/
// PUSH used to add data to the database, sending data to a storage container.
// Bodyparser is needed when pushing your items to a container. This helps in executing of the post request.
// Bodyparser enables express to read the body and convert the data into a json readable format.

var bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({extended:true})); // indicates that any request passed will have multiple formats.
app.use(bodyparser.json()); // Necessary to tell the app to use json format encoding.

/*
    Route:              /book/new.
    Description:        Add new books.
    Access:             PUBLIC
    Parameter:          NONE
    Methods:            POST
 */



app.post("/book/new", (req, res) => {
    const newBook = req.body;
    database.books.push(newBook);
    return res.json({updatedBooks: database.books});
})


/*
    Route:              /authors/new.
    Description:        Add a new author.
    Access:             PUBLIC
    Parameter:          NONE
    Methods:            POST
 */

app.post("/authors/new", (req, res) => {
    const newAuthor = req.body;
    database.author.push(newAuthor);
    return res.json({author: database.author});
});


/*
    Route           /publication/new.
    Description:    add a new publication.
    Access:         PUBLIC.
    Parameter:      NONE.
    Methods:        POST.
*/


app.post("/publications/new", (req, res) => {
    const newPublication = req.body;
    database.publication.push(newPublication);
    return res.json(database.publication);
});


/********************** PUT REQUESt *******************************/
/*
    Route           /publicatioon/update/book
    Description     update/ add new publication
    Access          PUBLIC
    Parameter       isbn
    Methods         PUT
*/


app.put("/publications/update/book/:isbn", (req, res) => {
    // update our publication in the database.
    database.publication.forEach((pub) => {
        if(pub.id = req.body.pubId){
            return pub.books.push(req.params.isbn);
        };
    }); 

    //Update the book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.publications = req.body.pubId;
            return;
        }
    });

    return res.json({
        books: database.books,
        publications: database.publication,
        message: "Successfully updated publications"
    });

});


/***********************DELETE REQUEST ***************/


/*
    ROUTE           /book/delete
    DESCRIPTION     Delete a book
    ACCESS          PUBLIC
    PARAMETER       ISBN
    METHODS         Delete
*/

app.delete("/book/delete/:isbn", (req, res) => {
    //A book that doen't match with the isbn is to be sent to an updatedBookDatabase array and filter out the rest
    const updatedBookDatabase= database.books.filter((book) => book.ISBN !== req.params.isbn);
    database.books = updatedBookDatabase;

    return res.json({books: database.books});
});


/*
    ROUTE           /book/author/:authorId/:isbn
    DESCRIPTION     Delete an author from a book and a book from the given author
    ACCESS          PUBLIC
    PARAMETER       author, ISBN
    METHODS         Delete
*/

app.delete('/book/delete/author/:isbn/:authorId', (req, res) => {
    // update the book database
   database.books.forEach((book) => {
    if(book.ISBN === req.params.isbn){
        const newAuthorList = book.author.filter((eachAuthor) => eachAuthor !== parseInt(req.params.authorId));
        book.author = newAuthorList;
    }
   });

   // update the author database.
   database.author.forEach((eachAuthor) => {
    if(eachAuthor.id !== parseInt(req.params.authorId)){
        const newBookList = eachAuthor.books.filter((book) => {
            book !== req.params.isbn;
        });
        eachAuthor.books = newBookList;
        return;
    }
   });

   res.json({
    book: database.books,
    author: database.author,
    message: "Successful deletion of book and author!!"
   })

});


app.listen(3000, () => {
    console.log(`Server is up and running at port ${3000}`);
});