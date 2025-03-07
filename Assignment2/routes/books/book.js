const express = require('express');
const router = express.Router();

const { getAllBooks, getBookById, createBook, updateBook, deleteBook } = require('./bookFunctions');//mew

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token === 'Bearer ZEWAIL') {
    next(); 
  } else {
    res.status(403).send('Forbidden: Invalid Token');
  }
};

router.get('/', async (req, res) => {
  const books = await getAllBooks();
  res.json(books);
});

router.get('/:id', async (req, res) => {
  const bId = parseInt(req.params.id);
  const book = await getBookById(bId); 

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  res.json(book);
});

router.post('/', authMiddleware, async (req, res) => {
  const { title, author } = req.body;
  const book = await createBook(title, author);
  res.json(book);
});

router.put('/:id', authMiddleware, async (req, res) => {
  const bId = parseInt(req.params.id);
  const { title, author } = req.body;

  const book = await updateBook(bId, title, author);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  res.json(book);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const bId = parseInt(req.params.id);
  const result = await deleteBook(bId);
  if (!result) {
    return res.status(404).json({ message: 'Book not found' });
  }
  res.status(204).send();
});

module.exports = router;