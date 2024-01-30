const bookStorage = [];
let currID = 0;
const libraryElement = document.querySelector("#library-display");
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
  const readStatus = document.querySelector("#read-status").value;

  const book = new BookConstructor(
    currID,
    bookTitle,
    bookDescription,
    bookPages,
    readStatus
  );

  bookStorage.push(book);
  console.log(bookStorage);
}

function displayBook(libraryElement, book) {
  const bookCard = document.createElement("article");
  const title = document.createElement("h3");
  const para2 = document.createElement("p");
  const para3 = document.createElement("p");
  const para4 = document.createElement("p");
  title.textContent = book.bookName;
  para2.textContent = book.bookDescription;
  para3.textContent = book.pages;
  para4.textContent = book.read;

  bookCard.append(title, para2, para3);
  libraryElement.append(bookCard);
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
      displayBook(libraryElement, book);
    }
  });
  
  currID++;
});
