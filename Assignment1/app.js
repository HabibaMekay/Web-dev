const express = require('express');
const app = express();
const port = 3000;

const books = require('./books');
  
app.use(express.json());

app.get('/', (req, res) => {
  res.json(books.getAllBooks());
});

app.get('/books/:id', (req, res) => {
  const bId = parseInt(req.params.id);
  const book = books.getBookById(bId);

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  res.json(book);
});

app.post('/books', (req, res) => {
  const book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
  };
  books.push(book);
  res.json(book);
});


app.put('/books/:id', (req, res) => { //update bec i forget
  const bId = parseInt(req.params.id);
  const book = updateBook(req.body.title, req.body.author)
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
});

app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  deleteBook(bookId)
  res.status(204).send();
});


app.listen(port, () => {
  console.log(`Server is running:" http://localhost:${port}`);
});
