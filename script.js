const iconPath = "icon/";
const library = [];

function Book(name, author, year, pages, read) {
  this.id = Book.id; // unique identifier for every book object
  this.name = name;
  this.author = author;
  this.year = year;
  this.pages = pages;
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
  let pages = document.createElement("div");
  let btnWrapper = document.createElement("div");
  let delButton = document.createElement("div");

  let readWrapper = document.createElement("div");
  let readDesc = document.createElement("div");
  let toggleRead = document.createElement("div");
  let readIconElement = document.createElement("img");

  let bookId = document.createElement("p");

  bookCard.classList.add("book-card");
  title.classList.add("title");
  desc.classList.add("desc");
  readDesc.classList.add("status");
  readWrapper.classList.add("read-wrapper", "flex", "y-center");
  btnWrapper.classList.add("btn-wrapper");
  delButton.classList.add("btn", "del-btn");
  bookId.classList.add("hidden", "id-element");
  toggleRead.classList.add("btn", "toggle-btn");
  readIconElement.classList.add("book-card-icon");

  title.textContent = book.name;
  desc.textContent = `${book.author} (${book.year})`;
  pages.textContent = `${book.pages} ${book.pages > 1 ? "pages" : "page"}`;
  readDesc.textContent = book.read ? "Already read" : "Not read yet";
  delButton.textContent = "X";
  bookId.textContent = book.id;
  let readIcon = book.read ? "book-check.svg" : "book-clock.svg";
  readIconElement.src = iconPath + readIcon;

  bookCard.appendChild(title);
  bookCard.appendChild(desc);
  bookCard.appendChild(pages);
  toggleRead.appendChild(readIconElement);
  readWrapper.appendChild(toggleRead);
  readWrapper.appendChild(readDesc);
  btnWrapper.appendChild(delButton);
  btnWrapper.appendChild(readWrapper);
  bookCard.appendChild(btnWrapper);
  bookCard.appendChild(bookId);
  libraryContainer.appendChild(bookCard);
  delButton.addEventListener("click", () => {
    removeFromLibrary(book.id);
    libraryContainer.removeChild(bookCard);
  });
  toggleRead.addEventListener("click", () => {
    book.read = !book.read;
    readDesc.textContent = book.read ? "Already read" : "Not read yet";
    let readIcon = book.read ? "book-check.svg" : "book-clock.svg";
    readIconElement.src = iconPath + readIcon;
    console.log(library);
  });
}
function addToLibrary(book) {
  library.push(book);
  createBookCard(book);
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
let b1 = new Book("Pride and Prejudice", "Jane Austen", 1813, 352, 0);
let b2 = new Book(
  "One Hundred Years of Solitude",
  "Gabriel Garcia Marquez",
  1967,
  487,
  1
);
let b3 = new Book("The lord of the Rings", "J.R.R. Tolkien", 1954, 436, 1);
let b5 = new Book(
  "The Ministry for the Future",
  "Kim Stanley Robinson",
  720,
  0
);

addToLibrary(b1);
addToLibrary(b2);
addToLibrary(b3);
// addToLibrary(b4);
console.log(library);
