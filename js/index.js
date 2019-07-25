document.addEventListener("DOMContentLoaded", function() {
    appendBooks()
});

const book_list = document.querySelector("#list")

let booksArray = []

const fetchGetBooks = () => {
    return fetch("http://localhost:3000/books")
    .then(resp => resp.json())
    .then(books => {
        booksArray = books
        return books
    })
}

const appendBooks = () => {
    fetchGetBooks()
    .then(books => {
        books.forEach(book => {
            createBook(book)
        })
    })
}

const createBook = (book) => {
    const createLi = document.createElement("li")
    book_list.appendChild(createLi)
    createLi.innerText = book.title
    createLi.dataset.id = book.id
}
const selectedBook = (event) => {
    const bookId = event.target.dataset.id
    getBook(bookId)
}

book_list.addEventListener("click", selectedBook)

const buildBook = (book) => {
    
    const panel = document.querySelector("#show-panel")
    panel.innerHTML = ""

    const newImg = document.createElement("img")
    newImg.src = book.img_url
    const newH1 = document.createElement("h1")
    newH1.innerText = book.title
    const newP2 = document.createElement("p")
    newP2.innerText = book.description
    const newButton = document.createElement("button")
    newButton.innerText = "Read"
    newButton.className = book.title
    newButton.addEventListener("click", (event) => doneReading(book))

    panel.append(newImg, newH1, newP2, newButton)

    book.users.forEach(user => {
        const newPinside = document.createElement("p")
        const newBold = document.createElement("b")
        newBold.innerText = user.username
        newPinside.appendChild(newBold)
        panel.appendChild(newPinside)
    })
}

const doneReading = (book) => {
    patchUserForBooks(book)
    .then(getBook(book.id))
}

const getUsers = (book) => {
    let data_array = []
    book.users.forEach(user => {
        const hash = {
            id: user.id,
            username: user.username
        }
        data_array.push(hash)
    })
    const pouros = {id: 1, username: "pouros"}
    if (data_array.some(user => { return user.id == pouros.id})) {
        return data_array
    } else {
        data_array.push(pouros)
    return data_array
    }
}

const patchUserForBooks = (book) => {
    const data = getUsers(book)
    return fetch(`http://localhost:3000/books/${book.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            users: data
         })
    })
    .then(resp => resp.json())
}

const patchDeletePouros = (book) => {
    return fetch(`http://localhost:3000/books/${book.id}`,{
        method: "DELETE"
    })
    .then(resp => resp.json())
}

const getBook = (id) => {
    fetchGetBooks()
    .then(books => {
        const returned_book = booksArray.find(book => {
            return book.id == id
        })
        buildBook(returned_book)
    })  
}

