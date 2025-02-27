const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/booksdb', {
  serverSelectionTimeoutMS: 30000, 
});


const bookSchema = new mongoose.Schema({
  id: Number,  
  title: String,
  author: String,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = {
  getAllBooks: async () => await Book.find(),

  getBookById: async (id) => await Book.findOne({ id }),

  createBook: async (title, author) => {
    const lastBook = await Book.findOne().sort({ id: -1 });
    const newID = lastBook.id + 1;
    const newBook = new Book({ id: newID, title, author });

    await newBook.save();
    return newBook;
  },

  updateBook: async (id, title, author) => {
    const book = await Book.findOne({ id });
    if (!book) return null;
    book.title = title;
    book.author = author;
    await book.save();
    return book;
  },

  deleteBook: async (id) => {
    const b = await Book.deleteOne({ id });
    if (b.deletedCount === 0) return null;
    return b;
  },
};
