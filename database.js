const books = [
    {
        ISBN: "1234Book",
        title: "Tesla!!!",
        pubDate: "2023-04-07",
        language: 'en',
        numPage: 250,
        author: [1, 2],
        publications: [1],
        category: ["tech", "space", "education"]
    }
]

const author =[
    {
        id: 1, 
        name: "Walshwade",
        books: ["12345Book", "The2way"]
    },

    {
        id: 2,
        name: "Elon Musk",
        books: ["12345Book"]
    }
]

const publication = [
    {
        id: 1, 
        name: "Writex",
        books: ['12345Book']
    },
    {
        id: 2, 
        name: "WriteY",
        books: ['123Book']
    },
    {
        id: 3, 
        name: "WriteZ",
        books: ['12Book']
    }
]


module.exports = {books, author, publication};
