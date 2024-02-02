const libraryElement = document.querySelector("#library-display");
const bookFormBtn = document.querySelector("#book-form-btn");
const closeBtn = document.querySelector("#close-btn");
const bookFormModal = document.querySelector("#book-form-modal");
const bookFormElement = document.querySelector("#book-form-element");

const Library = ((libraryElement) => {
  const bookStorage = [];

  function loadBooks() {
    const books = JSON.parse(localStorage.getItem("books"));

    if (books) {
      bookStorage.push(...books);
      refreshBookDisplay(libraryElement, bookStorage);
    }
  }

  function displayBooks(book) {
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
    para3.textContent =
      book.pages > 1 ? `${book.pages} Pages` : `${book.pages} page`;
    readBtn.setAttribute("id", `read-btn-${book.bookID}`);
    readBtn.textContent = book.read ? "Read" : "Not Read";
    readBtn.classList.add(book.read ? "read" : "not-read");
    readBtn.value = book.bookID;

    bookCard.append(deleteBtn, title, para2, para3, readBtn);
    libraryElement.append(bookCard);

    deleteBtn.addEventListener("click", (e) =>
      deleteBook(bookCard, e.target.value)
    );
    readBtn.addEventListener("click", (e) => {
      setReadStatus(e.currentTarget, e.target.value);
    });
  }

  function refreshBookDisplay() {
    libraryElement.replaceChildren();

    bookStorage.forEach((book) => {
      displayBooks(book);
    });
  }

  function saveBookStorage() {
    localStorage.setItem("books", JSON.stringify(bookStorage));
  }

  function storeBook(BookFactory) {
    const bookTitle = document.querySelector("#book-name").value;
    const bookDescription = document.querySelector("#book-description").value;
    const bookPages = document.querySelector("#book-pages").value;
    const readStatus = document.querySelector("#read-status").checked;

    const book = BookFactory(bookTitle, bookDescription, bookPages, readStatus);

    bookStorage.push(book);
    saveBookStorage();
  }

  const setReadStatus = (btn, id) => {
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
  };

  function deleteBook(cardElement, id) {
    const newBookArr = bookStorage.filter((book) => book.bookID !== id);

    bookStorage.splice(0, bookStorage.length, ...newBookArr);
    cardElement.remove();
    saveBookStorage();
  }

  return {
    loadBooks,
    storeBook,
    refreshBookDisplay,
    saveBookStorage,
  };
})(libraryElement);

window.onload = () => {
  Library.loadBooks();
};

function BookFactory(bookName, bookDescription, pages, read) {
  const bookID = Math.random().toString(36).slice(2);

  return {
    bookID,
    bookName,
    bookDescription,
    pages,
    read,
  };
}

bookFormBtn.addEventListener("click", () => {
  bookFormModal.showModal();
});

closeBtn.addEventListener("click", () => {
  bookFormModal.close();
});

bookFormElement.addEventListener("submit", (e) => {
  e.preventDefault();

  Library.storeBook(BookFactory);
  bookFormElement.reset();
  bookFormModal.close();
  Library.refreshBookDisplay(libraryElement);
});
