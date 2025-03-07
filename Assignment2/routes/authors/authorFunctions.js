const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/booksbd', {
  serverSelectionTimeoutMS: 30000,
});


const authorSchema = new mongoose.Schema({
  id: Number, 
  name: String, 
});


const Author = mongoose.model('Author', authorSchema);
module.exports = {
  getAllAuthors: async () => await Author.find(),
  getAuthorById: async (id) => await Author.findOne({ id }),
  createAuthor: async (name) => {
    const lastAuthor = await Author.findOne().sort({ id: -1 });
    const newID = lastAuthor.id + 1;
    const newAuthor = new Author({ id: newID, name });
    await newAuthor.save();
    return newAuthor;
  },

  updateAuthor: async (id, name) => {
    const author = await Author.findOne({ id });
    if (!author) return null; 
    author.name = name;
    await author.save();
    return author;
  },

  deleteAuthor: async (id) => {
    const result = await Author.deleteOne({ id });
    if (result.deletedCount === 0) return null; 
    return result;
  },
};