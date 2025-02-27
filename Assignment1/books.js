const mongoose = require('mongoose');

// const connection = mongoose.createConnection("mongodb://localhost:27017/booksdb")
// console.log("Test")

mongoose.connect('mongodb://localhost:27017/booksdb')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const bookSchema = new mongoose.Schema({
  id: Number,
  title: String,
  author: String,
})//,{ _id: false }); //ana aslan 3mla id field, inshallah i dont need el _id

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

  	
