console.log("MObig's Library")

function bookConstructor(bookName, bookDescription, read) {
    this.bookName = bookName;
    this.bookDescription = bookDescription;
    this.read = read;
}

const book = new bookConstructor('ATMYEN', 'Self teaching guide to relaern secondary school math', false);

console.log(book);