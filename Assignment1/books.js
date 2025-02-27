const mongoose = require('mongoose');

const connection = mongoose.createConnection("mongodb://localhost:3000/booksdb", {
  useUnifiedTopology: true,});

connectToDatabase();

const bookSchema = new mongoose.Schema({
  id: int,
  title: String,
  author: String,
});

const Book = mongoose.model('Book', bookSchema);


module.exports = {
  getAllBooks: async () => await Book.find(),
  getBookById: async (id) => await Book.findById(id),
  createBook: async (title, author) => {
    const book = Book.find().sort({ "id": -1 });
    const newID= book.id +1
    const newBook = new Book({ newID , title, author });
    await newBook.save();
    return newBook;
  },
  updateBook: async (id, title, author) => {
    const book = getBookById(id);
    book.title = title
    book.author=author
    return book
  },

  deleteBook: async (id) => {
    await Book.deleteOne({id:id});
    return;
  }

}

  	
