const express = require('express');
const router = express.Router();

const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require('./postFunctions');//mew

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token === 'Bearer ZEWAIL') {
    next(); 
  } else {
    res.status(403).send('Forbidden: Invalid Token');
  }
};

router.get('/', async (req, res) => {
  const posts = await getAllPosts();
  res.json(posts);
});

router.get('/:id', async (req, res) => {
  const bId = parseInt(req.params.id);
  const post = await getPostById(bId); 

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  res.json(post);
});

router.post('/', authMiddleware, async (req, res) => {
  const { title, author, description } = req.body;
  const post = await createPost(title, author, description);
  res.json(post);
});

router.put('/:id', authMiddleware, async (req, res) => {
  const bId = req.params.id;
  const { title, author, description } = req.body;

  const post = await updatePost(bId, title, author, description);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  res.json(post);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const bId = req.params.id; 
  const result = await deletePost(bId);
  if (!result) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.status(204).send();
});

module.exports = router;