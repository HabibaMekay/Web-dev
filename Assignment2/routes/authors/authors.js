const express = require('express');
const router = express.Router();

const { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } = require('./authorFunctions');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token === 'Bearer ZEWAIL') {
    next(); 
  } else {
    res.status(403).send('Forbidden: Invalid Token');
  }
};

router.get('/', async (req, res) => {
  const authors = await getAllAuthors();
  res.json(authors);
});

router.get('/:id', async (req, res) => {
  const aId = parseInt(req.params.id);
  const author = await getAuthorById(aId);

  if (!author) {
    return res.status(404).json({ message: 'Author not found' });
  }

  res.json(author);
});

router.post('/', authMiddleware, async (req, res) => {
  const { name } = req.body;
  const author = await createAuthor(name);
  res.json(author);
});

router.put('/:id', authMiddleware, async (req, res) => {
  const aId = parseInt(req.params.id);
  const { name } = req.body;

  const author = await updateAuthor(aId, name);
  if (!author) {
    return res.status(404).json({ message: 'Author not found' });
  }

  res.json(author);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const aId = parseInt(req.params.id);
  const result = await deleteAuthor(aId);
  if (!result) {
    return res.status(404).json({ message: 'Author not found' });
  }
  res.status(204).send();
});

module.exports = router;