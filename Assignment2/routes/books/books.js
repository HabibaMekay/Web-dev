const express = require('express');
const router = express.Router();

const { getAllBooks, getBookById, createBook, updateBook, deleteBook } = require('./bookFunctions');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token === 'Bearer ZEWAIL') {
    next(); 
  } else {
    res.status(403).send('Forbidden: Invalid Token');
  }
};

app.get('/', async (req, res) => {
  const books = await getAllBooks();
  res.json(books);
});

app.get('/:id', async (req, res) => {
  const bId = parseInt(req.params.id);
  const book = await getBookById(bId); 

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  res.json(book);
});

app.post('/', async (req, res) => {
  const { title, author } = req.body;
  const book = await createBook(title, author);
  res.json(book);
});

app.put('/:id', async (req, res) => {
  const bId = parseInt(req.params.id);
  const { title, author } = req.body;

  const book = await updateBook(bId, title, author);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  res.json(book);
});

app.delete('/:id', async (req, res) => {
  const bId = parseInt(req.params.id);
  await deleteBook(bId);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
