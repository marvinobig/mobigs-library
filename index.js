const bookStorage = [];
const libraryElement = document.querySelector("#library-display");
const resetBtn = document.querySelector("#reset-btn");
const bookFormBtn = document.querySelector("#book-form-btn");
const bookFormSubmitBtn = document.querySelector("#book-submit");
const closeBtn = document.querySelector("#close-btn");
const bookForm = document.querySelector("#book-form-modal");

window.onload = () => {
  const books = JSON.parse(localStorage.getItem("books"));

  if (books) {
    bookStorage.push(...books);
    accessBooks(libraryElement, bookStorage);
  }
};

function BookConstructor(bookID, bookName, bookDescription, pages, read) {
  this.bookID = bookID;
  this.bookName = bookName;
  this.bookDescription = bookDescription;
  this.pages = pages;
  this.read = read;
}

function idGen() {
  return Math.random().toString(36).slice(2);
};

function storeBook(BookConstructor, bookStorage) {
  const bookTitle = document.querySelector("#book-name").value;
  const bookDescription = document.querySelector("#book-description").value;
  const bookPages = document.querySelector("#book-pages").value;
  const readStatus = document.querySelector("#read-status").checked;
  const id = idGen();

  console.log(id);

  const book = new BookConstructor(
    id,
    bookTitle,
    bookDescription,
    bookPages,
    readStatus
  );

  bookStorage.push(book);
  saveBookStorage(bookStorage);
}

function saveBookStorage(bookStorage) {
  localStorage.setItem("books", JSON.stringify(bookStorage));
}

function displayBook(libraryElement, book, bookStorage) {
  const bookCard = document.createElement("article");
  const title = document.createElement("h3");
  const para2 = document.createElement("p");
  const para3 = document.createElement("p");
  const readBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  deleteBtn.setAttribute("id", "delete-btn");
  deleteBtn.textContent = "X";
  deleteBtn.value = book.bookID;
  title.textContent = book.bookName;
  para2.textContent = book.bookDescription;
  para3.textContent = book.pages > 1 ? `${book.pages} Pages` : `${book.pages} page`;
  readBtn.setAttribute("id", `read-btn-${book.bookID}`);
  readBtn.textContent = book.read ? "Read" : "Not Read";
  readBtn.classList.add(book.read ? 'read' : 'not-read')
  readBtn.value = book.bookID;

  bookCard.append(deleteBtn, title, para2, para3, readBtn);
  libraryElement.append(bookCard);

  deleteBtn.addEventListener("click", (e) =>
    deleteBook(bookCard, bookStorage, e.target.value)
  );
  readBtn.addEventListener("click", (e) =>
    setReadStatus(readBtn, bookStorage, e.target.value)
  );
}

function deleteBook(cardElement, bookStorage, id) {
  const newBookArr = bookStorage.filter((book) => book.bookID !== id);

  bookStorage.splice(0, bookStorage.length, ...newBookArr);
  cardElement.remove();
  saveBookStorage(bookStorage);
}

function setReadStatus(btn, bookStorage, id) {
  bookStorage.forEach((book) => {
    if (book.bookID === id) {
      if (book.read) {
        btn.classList.remove(book.read ? "read" : "not-read");
        book.read = false;
        btn.textContent = "Not Read";
        btn.classList.add(book.read ? "read" : "not-read");
      } else {
        btn.classList.remove(book.read ? "read" : "not-read");
        book.read = true;
        btn.textContent = "Read";
        btn.classList.add(book.read ? "read" : "not-read");
      }
    }
  });

  saveBookStorage(bookStorage);
}

function accessBooks(libraryElement, bookStorage) {
  libraryElement.replaceChildren();

  bookStorage.forEach((book) => {
    displayBook(libraryElement, book, bookStorage);
  });
}

bookFormBtn.addEventListener("click", () => {
  bookForm.showModal();
});

closeBtn.addEventListener("click", () => {
  bookForm.close();
});

bookFormSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  storeBook(BookConstructor, bookStorage);
  bookForm.close();

  accessBooks(libraryElement, bookStorage);
});
