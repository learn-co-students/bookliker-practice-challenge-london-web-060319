document.addEventListener("DOMContentLoaded", function() {
    
    fetchAndRenderBooks()
});
const divList = document.querySelector("#list")
const baseUrl = "http://localhost:3000/books"

const fetchAndRenderBooks = () => {
    fetchAllBooks().then( renderAllBooks )
}

const fetchAllBooks = () => {
    return fetch(baseUrl)
    .then(resp => resp.json())
}

const renderAllBooks = (books) => {
  divList.innerHTML = ""
  books.forEach( listBookByTitle )
}

const listBookByTitle = (book) => {
    const bookLi = document.createElement('li')
    bookLi.innerText = book.title;
    bookLi.addEventListener('click', () => showBookInfo(book))
    divList.appendChild(bookLi)
  }

const showBookInfo = (book) => {
    const divShow = document.querySelector("#show-panel")
    divShow.innerHTML  = ""

    const bookDiv = document.createElement("div")

    const bookImg = document.createElement("img")
    bookImg.src = book.img_url

    const bookDescription =document.createElement("p")
    bookDescription.innerText =book.description

    const bookUsers = document.createElement('ul')
    book.users.forEach(user => {
        const username = document.createElement('li')
        username.innerText = user.username
        bookUsers.appendChild(username)
    })
    const bookBtn = document.createElement("button")
    bookBtn.innerText = `Likes: ${book.users.legth}`
    bookBtn.addEventListener("click", () => submitLike(book))

    bookDiv.append(bookImg, bookDescription, bookUsers, bookBtn)
    divShow.appendChild(bookDiv)
}




function submitLike(book) {
book.users.push({"id": 1, "username": "pouros"})
fetch(baseUrl + `/${book.id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      "users": book.users
    })
})
.then(resp => resp.json())
.then(showBookInfo(book))
}