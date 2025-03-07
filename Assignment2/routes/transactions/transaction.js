const express = require('express');
const router = express.Router();

const { getAllTransactions, borrowTransaction, returnTransaction, getTransactionById, deleteTransaction } = require('./transactionFunctions');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token === 'Bearer ZEWAIL') {
    next();
  } else {
    res.status(403).send('Forbidden: Invalid Token');
  }
};

router.get('/', async (req, res) => {
  const transactions = await getAllTransactions();
  res.json(transactions);
});

router.get('/:id', async (req, res) => {
  const tId = parseInt(req.params.id);
  const transaction = await getTransactionById(tId);

  if (!transaction) {
    return res.status(404).json({ message: 'Transaction not found' });
  }

  res.json(transaction);
});

router.post('/borrow', authMiddleware, async (req, res) => {
  const { bookId, userId } = req.body;

  try {
    const transaction = await borrowTransaction(bookId, userId);
    res.json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  
});

router.put('/return/:bookId', authMiddleware, async (req, res) => {
  const bookId = parseInt(req.params.bookId);

  try {
    const transaction = await returnTransaction(bookId);
    res.json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const tId = parseInt(req.params.id);
  const result = await deleteTransaction(tId);
  if (!result) {
    return res.status(404).json({ message: 'Transaction not found' });
  }
  res.status(204).send();
});

module.exports = router;
