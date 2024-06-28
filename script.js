const library = [];

function Book(name, author, year, read) {
  this.id = Book.id;
  this.name = name;
  this.author = author;
  this.year = year;
  this.read = read;
  Book.id++;
}
Object.defineProperty(Book, "id", {
  value: 0,
  writable: true,
  enumerable: true,
});

Book.prototype.info = function () {
  return `${this.id} - ${this.name} by ${this.author} (${this.year}), ${this.read}`;
};

function createBookCard(book) {
  let bookCard = document.createElement("div");
  let title = document.createElement("div");
  let desc = document.createElement("div");
  let status = document.createElement("div");
  let delButton = document.createElement("div");
  let toggleRead = document.createElement("div");
  let bookId = document.createElement("p");

  bookCard.classList.add("book-card");
  title.classList.add("title");
  desc.classList.add("desc");
  status.classList.add("status");
  delButton.classList.add("btn", "del-btn");
  bookId.classList.add("hidden", "id-element");

  title.textContent = book.name;
  desc.textContent = `by ${book.author}, ${book.year}`;
  status.textContent = book.read ? "Already read" : "Not read yet";
  delButton.textContent = "Remove";
  bookId.textContent = book.id;
  toggleRead.textContent = "Toggle Read";

  bookCard.appendChild(title);
  bookCard.appendChild(desc);
  bookCard.appendChild(status);
  bookCard.appendChild(delButton);
  bookCard.appendChild(toggleRead);
  bookCard.appendChild(bookId);
  libraryContainer.appendChild(bookCard);
  delButton.addEventListener("click", () => {
    removeFromLibrary(book.id);
    libraryContainer.removeChild(bookCard);
  });
  toggleRead.addEventListener("click", () => {
    updateBookReadStatus(book.id);
    status.textContent = book.read ? "Already read" : "Not read yet";
    console.log(library);
  });
}
function addToLibrary(book) {
  library.push(book);
  createBookCard(book);
}
function findBook(bookId) {
  return null;
}
function updateBookReadStatus(bookId) {
  let index = library.findIndex((book) => book.id === bookId);
  if (index !== -1) {
    library[index].read = !library[index].read;
  }
}

function removeFromLibrary(bookId) {
  let index = library.findIndex((book) => book.id === bookId);
  if (index !== -1) {
    library.splice(index, 1);
  }
}
const libraryContainer = document.getElementById("library-container");
const showDialog = document.getElementById("add-btn");
const dialogForm = document.getElementById("dialog-form");
const addButton = document.querySelector(`dialog#dialog-form input#confirm`);
// input
const titleField = document.querySelector("input#title");
const authorField = document.querySelector("input#author");
const yearField = document.querySelector("input#year");
const readField = document.querySelector("input#read-status1");
// event listeners
function createBookForm(title, author, year, read) {
  let newBook = new Book(title, author, year, read);
  addToLibrary(newBook);
}
showDialog.addEventListener("click", () => {
  dialogForm.showModal();
});
addButton.addEventListener("click", (event) => {
  event.preventDefault();
  let year = parseInt(yearField.value);
  let readStatus = readField.checked;
  createBookForm(titleField.value, authorField.value, year, readStatus);
  dialogForm.close();
});

// main
let b1 = new Book("book1", "author1", 2023, false);
let b2 = new Book("book2", "author2", 2022, true);
let b3 = new Book("book3", "author3", 2022, false);
// let b4 = new Book("book4", "author4", 2021, false);

addToLibrary(b1);
addToLibrary(b2);
addToLibrary(b3);
// addToLibrary(b4);
console.log(library);
