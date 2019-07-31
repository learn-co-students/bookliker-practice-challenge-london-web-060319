const booksURL = "http://localhost:3000/books"
const bookList = document.querySelector('#list')

 document.addEventListener("DOMContentLoaded", () => {
  fetchAndListAllBooks()
});

 const fetchAndListAllBooks = () => {
  fetchAllBooks()
  .then( listAllBooks )
}

 const fetchAllBooks = () => {
  return fetch( booksURL )
  .then( resp => resp.json() )
}

 const listAllBooks = (books) => {
  // bookList.innerHTML = ""
  books.forEach( listBookByTitle )
}

 const listBookByTitle = (book) => {
  const bookLi = document.createElement('li')
  bookLi.innerText = book.title;
  bookLi.addEventListener('click', () => showBookInfo(book))
  bookList.appendChild(bookLi)
}

 const showBookInfo = book => {
  const bookPanel = document.querySelector('#show-panel')
  bookPanel.innerHTML = ""

   const bookDiv = document.createElement('div')

   const bookImg = document.createElement('img')
  bookImg.src = book.img_url

   const bookDescription = document.createElement('p')
  bookDescription.innerText = book.description

   const bookUsers = document.createElement('ul')
  book.users.forEach(user => {
    const username = document.createElement('li')
    username.innerText = user.username
    bookUsers.appendChild(username)
  })

   const bookBtn = document.createElement('button')
  bookBtn.innerText = `Likes: ${book.users.length}`
  bookBtn.addEventListener('click', () => submitLike(book))

   bookDiv.append(bookImg, bookDescription, bookUsers, bookBtn)
  bookPanel.appendChild(bookDiv)
}

 function submitLike(book) {
  book.users.push({"id": 1, "username": "pouros"})
  fetch(booksURL + `/${book.id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "users": book.users
      })
  })
  .then(resp => resp.json())
  .then(showBookInfo(book))
}
