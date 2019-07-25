document.addEventListener("DOMContentLoaded", () => {
  fetchBooks()
});

const bookUrl = 'http://localhost:3000/books/';
const list = document.querySelector('#list');
const show = document.querySelector('#show-panel');


function fetchBooks() {
  return fetch(bookUrl)
    .then(resp => resp.json())
    .then (books => renderAllBooks(books));
}

function renderAllBooks(books) {
  console.log(books);
  books.forEach(book => renderBook(book));
}

function renderBook(book) {
  console.log(book);
  const listItem = document.createElement('li');
    listItem.innerText = book.title;  
    listItem.addEventListener('click', () => showBook(book));
    list.appendChild(listItem);
}

function showBook(book) {
  console.log(book)
  show.innerHTML = '';
  const card = document.createElement('div');
  
  const title = document.createElement('h3');
    title.innerText = book.title;
  const img = document.createElement('img');
    img.src = book.img_url;
  const desc = document.createElement('p');
    desc.innerText = book.description;
  const bookUsers = document.createElement('ul');
    book.users.forEach(user => {
      const username = document.createElement('li');
      username.innerText = user.username;
      bookUsers.appendChild(username);
    })
  const likeBtn = document.createElement('button');
    likeBtn.innerText = `Like this Book (${book.users.length})`;
    likeBtn.addEventListener('click', () => submitLike(book));

    card.appendChild(title);
    card.appendChild(img);
    card.appendChild(desc);
    card.appendChild(bookUsers);
    card.appendChild(likeBtn);
    show.append(card);
}

function  submitLike(book) {
  book.users.push({'id': 1, 'username': 'pouros'})
  fetch(bookUrl + book.id, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'users': book.users,
    })
  })
  .then(resp => resp.json())
  .then(showBook(book));
}