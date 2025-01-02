class Book {
  static id = 0;
  constructor(name, author, year, pages, read) {
    this.id = Book.id; // unique identifier for every book object
    this.name = name;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.read = read;
    Book.id++;
  }

  info() {
    return `${this.id} - ${this.name} by ${this.author} (${this.year}), ${this.read}`;
  }

  switchReadStatus() {
    this.read = !this.read;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  removeBook(bookId) {
    let index = this.books.findIndex((book) => book.id === bookId);
    if (index !== -1) {
      this.books.splice(index, 1);
    }
  }
}
class LibraryController {
  #iconPath = "icons/";
  #bookCheckIcon = this.#iconPath + "book-check.svg";
  #bookClockIcon = this.#iconPath + "book-clock.svg";
  #deleteIcon = this.#iconPath + "trash-can.svg";

  constructor(doc) {
    this.library = new Library();

    // DOM elements
    this.libraryContainer = doc.getElementById("library-container");
    this.showDialog = doc.getElementById("add-btn");
    this.dialogForm = doc.getElementById("dialog-form");
    this.addButton = doc.querySelector(`dialog#dialog-form input#confirm`);
    this.cancelButton = doc.querySelector(
      `dialog#dialog-form input#noval-close`
    );

    // input
    this.titleField = doc.querySelector("input#title");
    this.authorField = doc.querySelector("input#author");
    this.yearField = doc.querySelector("input#year");
    this.pagesField = doc.querySelector("input#pages");
    this.readField = doc.querySelector("input#read-status1");

    this.#bindEvents();
  }

  addToLibrary(book) {
    this.library.addBook(book);
    this.#createBookCard(book);
  }

  #removeFromLibrary(bookId) {
    this.library.removeBook(bookId);
  }

  #bindEvents() {
    this.showDialog.addEventListener("click", () => this.#showForm());
    this.addButton.addEventListener("click", (event) =>
      this.#addBookButton(event)
    );
    this.cancelButton.addEventListener("click", () => this.#cancelFormButton());
  }

  #showForm() {
    this.dialogForm.showModal();
  }

  #addBookButton(event) {
    // console.log("fire");
    event.preventDefault();
    let year = parseInt(this.yearField.value);
    let pages = parseInt(this.pagesField.value);
    let readStatus = this.readField.checked;
    this.#createBookForm(
      this.titleField.value,
      this.authorField.value,
      year,
      pages,
      readStatus
    );
    this.#resetDialogFields();
    this.dialogForm.close();
  }

  #cancelFormButton() {
    this.#resetDialogFields();
  }

  #createBookForm(title, author, year, pages, read) {
    let newBook = new Book(title, author, year, pages, read);
    this.addToLibrary(newBook);
  }

  #resetDialogFields() {
    this.titleField.value = "";
    this.authorField.value = "";
    this.yearField.value = "";
    this.pagesField.value = "";
    this.readField.checked = true;
  }

  #createBookCard(book) {
    let bookCard = document.createElement("div");
    let contentSection = document.createElement("div");
    let title = document.createElement("div");
    let desc = document.createElement("div");
    let pages = document.createElement("div");

    let btnWrapper = document.createElement("div");
    let delButton = document.createElement("div");
    let readWrapper = document.createElement("div");
    let readDesc = document.createElement("div");
    let toggleWrapper = document.createElement("div");

    let readIconElement = document.createElement("img");
    let deleteIconElement = document.createElement("img");

    bookCard.classList.add("book-card", "flex");
    title.classList.add("title");
    desc.classList.add("desc");
    readDesc.classList.add("status");
    readWrapper.classList.add("read-wrapper", "flex", "y-center");
    btnWrapper.classList.add("btn-wrapper");

    delButton.classList.add("btn", "round-corners-1x", "btn-warning");
    deleteIconElement.classList.add("book-card-icon");

    readIconElement.classList.add("book-card-icon");
    toggleWrapper.classList.add("btn", "round-corners-1x");
    if (book.read) {
      toggleWrapper.classList.add("btn-secondary");
    } else {
      toggleWrapper.classList.add("btn-disabled");
    }

    // content
    title.textContent = book.name;
    desc.textContent = `${book.author} (${book.year})`;
    pages.textContent = `${book.pages} ${book.pages > 1 ? "pages" : "page"}`;
    readDesc.textContent = book.read ? "Already read" : "Not read yet";

    // delButton.textContent = "X";
    let readIcon = book.read ? this.#bookCheckIcon : this.#bookClockIcon;
    readIconElement.src = readIcon;
    deleteIconElement.src = this.#deleteIcon;

    contentSection.appendChild(title);
    contentSection.appendChild(desc);
    contentSection.appendChild(pages);
    toggleWrapper.appendChild(readIconElement);
    readWrapper.appendChild(readDesc);
    readWrapper.appendChild(toggleWrapper);
    delButton.appendChild(deleteIconElement);
    btnWrapper.appendChild(delButton);
    btnWrapper.appendChild(readWrapper);
    bookCard.appendChild(contentSection);
    bookCard.appendChild(btnWrapper);

    this.libraryContainer.appendChild(bookCard);
    this.#bookCardBindEvents(
      { delButton, readDesc, readIconElement, toggleWrapper },
      bookCard,
      book
    );
  }

  #bookCardBindEvents(elements, bookCard, book) {
    elements.delButton.addEventListener("click", () =>
      this.#removeBook(bookCard, book)
    );
    elements.toggleWrapper.addEventListener("click", () =>
      this.#switchReadStatus(elements, book)
    );
  }

  #removeBook(bookCard, book) {
    this.#removeFromLibrary(book.id);
    this.libraryContainer.removeChild(bookCard);
  }

  #switchReadStatus(elements, book) {
    book.switchReadStatus();
    elements.readDesc.textContent = book.read ? "Already read" : "Not read yet";
    let readIcon = book.read ? this.#bookCheckIcon : this.#bookClockIcon;
    elements.readIconElement.src = readIcon;
    // change background of toggle wrapper
    let oldClass, currentClass;
    if (book.read) {
      oldClass = "btn-disabled";
      currentClass = "btn-secondary";
    } else {
      oldClass = "btn-secondary";
      currentClass = "btn-disabled";
    }
    elements.toggleWrapper.classList.remove(oldClass);
    elements.toggleWrapper.classList.add(currentClass);
  }
}
// main
(function (doc) {
  let b1 = new Book("Pride and Prejudice", "Jane Austen", 1813, 352, 0);
  let b2 = new Book(
    "One Hundred Years of Solitude",
    "Gabriel Garcia Marquez",
    1967,
    487,
    1
  );
  let b3 = new Book(
    "The Lord of the Rings: The Fellowship of the Ring",
    "J.R.R. Tolkien",
    1954,
    436,
    1
  );
  let b4 = new Book(
    "Th Ministry for the Future",
    "Kim Stanley Robinson",
    2019,
    720,
    0
  );
  const library = new LibraryController(doc);
  library.addToLibrary(b1);
  library.addToLibrary(b2);
  library.addToLibrary(b3);
  library.addToLibrary(b4);
})(document);
