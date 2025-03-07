const express = require('express');
const router = express.Router();

const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('./userFunctions');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token === 'Bearer ZEWAIL') {
    next(); 
  } else {
    res.status(403).send('Forbidden: Invalid Token');
  }
};

router.get('/', async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const uId = parseInt(req.params.id);
  const user = await getUserById(uId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
});

router.post('/', authMiddleware, async (req, res) => {
  const { name, email } = req.body;
  const user = await createUser(name, email);
  res.json(user);
});

router.put('/:id', authMiddleware, async (req, res) => {
  const uId = parseInt(req.params.id);
  const { name, email } = req.body;

  const user = await updateUser(uId, name, email);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const uId = parseInt(req.params.id);
  const result = await deleteUser(uId);
  if (!result) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(204).send();
});

module.exports = router;
