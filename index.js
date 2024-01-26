function bookConstructor(bookName, bookDescription, read) {
    this.bookName = bookName;
    this.bookDescription = bookDescription;
    this.read = read;
}

const bookStorage = [];

console.log("MObig's Library");

const book = new bookConstructor('ATMYEN', 'Self teaching guide to relearn secondary school math', false);
bookStorage.push(book);

console.log(book, bookStorage);

const div = document.createElement('div');
const para1 = document.createElement('p');
const para2 = document.createElement('p');
const para3 = document.createElement('p');
para1.textContent = book.bookName;
para2.textContent = book.bookDescription;
para3.textContent = book.read;

div.append(para1, para2, para3);
document.body.append(div);