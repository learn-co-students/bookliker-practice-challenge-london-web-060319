document.addEventListener("DOMContentLoaded", () => {
fetchBooks()
});
const bookURL = "http://localhost:3000/books/"
const list = document.getElementById('list')
const show = document.querySelector('#show-panel')

function fetchBooks(){
    return fetch(bookURL)
    .then(resp => resp.json())
    .then(books => renderAllBooks(books))
}

function renderAllBooks(books){
    list.innerHTML = ""
    books.forEach(book => renderBook(book))
}

function renderBook(book){
   const listItem = document.createElement('li')
   listItem.innerText = book.title
   listItem.addEventListener('click', () => showBook(book))
   list.appendChild(listItem)
}

function showBook(book){
   console.log(book)
   show.innerHTML = ""
    const card = document.createElement('div')
    
    const title = document.createElement('h3')
    title.innerText = book.title
    
    const image = document.createElement('img')
    image.src = book.img_url

    const desc = document.createElement('p')
    desc.innerText = book.description
    
    const likers = document.createElement('ul')
    book.users.forEach(user => {
        const username = document.createElement('li')
        username.innerText = user.username
        likers.appendChild(username)
    })
    
    const btn = document.createElement('button')
    btn.innerText = `Likes: ${book.users.length}`
    btn.addEventListener('click', () => submitLike(book))

    card.appendChild(title)
    card.appendChild(image)
    card.appendChild(desc)
    card.appendChild(likers)
    card.appendChild(btn)
    show.append(card)
}

function submitLike(book){
    book.users.push({"id": 1, "username": "pouros"})
    fetch(bookURL + book.id, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "users": book.users
        })
    })
    .then(data=>data.json())
    .then(console.log)
    // .then(fetchBooks())
    .then(showBook(book))
    // console.log(book)
    
}