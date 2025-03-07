const express = require('express');
const app = express();
const port = 3000;

const { getAllBooks, getBookById, createBook, updateBook, deleteBook } = require('./books'); //mew

app.use(express.json());

app.get('/', async (req, res) => {
  const books = await getAllBooks();
  res.json(books);
});

app.get('/books/:id', async (req, res) => {
  const bId = parseInt(req.params.id);
  const book = await getBookById(bId); 

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  res.json(book);
});

app.post('/books', async (req, res) => {
  const { title, author } = req.body;
  const book = await createBook(title, author);
  res.json(book);
});

app.put('/books/:id', async (req, res) => {
  const bId = parseInt(req.params.id);
  const { title, author } = req.body;

  const book = await updateBook(bId, title, author);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  res.json(book);
});

app.delete('/books/:id', async (req, res) => {
  const bId = parseInt(req.params.id);
  await deleteBook(bId);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
