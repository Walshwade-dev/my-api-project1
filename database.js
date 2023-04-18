const books = [
    {
        ISBN: "1234Book",
        title: "Tesla!!!",
        pubDate: "2023-04-07",
        language: ['en', 'ksw', 'kikuyu'],
        numPage: 250,
        author: [1, 2],
        publications: [1],
        category: ["Tech", "Space", "Education"]
    },
    {
        ISBN: "12Book",
        title: "Astro!!!",
        pubDate: "2023-04-07",
        language: ['en', 'kikuyu'],
        numPage: 250,
        author: [1],
        publications: [1, 2],
        category: ["Tech", "Physics", "Education"]
    },
    {
        ISBN: "123Book",
        title: "BlueOrigin",
        pubDate: "2023-04-07",
        language: ['kisw', 'kikuyu'],
        numPage: 250,
        author: [1, 2, 3],
        publications: [2, 3],
        category: ["Physics", "Aeronautics", "Education"]
    },
    {
        ISBN: "12345Book",
        title: "Isro",
        pubDate: "2023-04-07",
        language: ['en', 'hindi', 'kikuyu'],
        numPage: 250,
        author: [1, 2, 5],
        publications: [1, 4],
        category: ["Mathematics", "Geography", "Education"]
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
