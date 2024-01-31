const bookStorage = [];
let currID = 0;
const libraryElement = document.querySelector("#library-display");
const resetBtn = document.querySelector("#reset-btn");
const bookFormBtn = document.querySelector("#book-form-btn");
const bookFormSubmitBtn = document.querySelector("#book-submit");
const closeBtn = document.querySelector("#close-btn");
const bookForm = document.querySelector("#book-form-modal");

function BookConstructor(bookID, bookName, bookDescription, pages, read) {
  this.bookID = bookID;
  this.bookName = bookName;
  this.bookDescription = bookDescription;
  this.pages = pages;
  this.read = read;
}

// Create and store book
function storeBook(BookConstructor, bookStorage, currID) {
  const bookTitle = document.querySelector("#book-name").value;
  const bookDescription = document.querySelector("#book-description").value;
  const bookPages = document.querySelector("#book-pages").value;
  const readStatus = document.querySelector("#read-status").checked;

  const book = new BookConstructor(
    currID,
    bookTitle,
    bookDescription,
    bookPages,
    readStatus
  );

  bookStorage.push(book);
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
  para3.textContent = book.pages;
  readBtn.setAttribute("id", `read-btn-${book.bookID}`);
  readBtn.textContent = book.read ? "Read" : "Not Read";
  readBtn.value = book.bookID;

  bookCard.append(deleteBtn, title, para2, para3, readBtn);
  libraryElement.append(bookCard);

  deleteBtn.addEventListener("click", (e) =>
    deleteBook(bookCard, bookStorage, Number(e.target.value))
  );
  readBtn.addEventListener("click", (e) =>
    setReadStatus(readBtn, bookStorage, Number(e.target.value))
  );
}

function deleteBook(cardElement, bookStorage, id) {
  const newBookArr = bookStorage.filter((book) => book.bookID !== id);

  bookStorage.splice(0, bookStorage.length, ...newBookArr);
  cardElement.remove();
}

function setReadStatus(btn, bookStorage, id) {
  bookStorage.forEach((book) => {
    if (book.bookID === id) {
      if (book.read) {
        book.read = false;
        btn.textContent = "Not Read";
      } else {
        book.read = true;
        btn.textContent = "Read";
      }
    }
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

  storeBook(BookConstructor, bookStorage, currID);
  bookForm.close();

  // Creating book in DOM using constructor function
  bookStorage.forEach((book) => {
    if (book.bookID == currID) {
      displayBook(libraryElement, book, bookStorage);
    }
  });

  currID++;
});
