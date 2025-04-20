const express = require('express');
const { authentication } = require('../middleware/authentication');
const { authorization } = require('../middleware/authorization');

const router = express.Router();

router.get('/public', (req, res) => {
  res.json({ message: 'This is a public route' });
});

router.get('/protected', authentication, (req, res) => {
  res.json({ message: 'This is a protected route'});
});

router.get('/moderator', authentication, authorization('moderator'), (req, res) => {
  res.json({ message: 'This is a moderator route'});
});

router.get('/admin', authentication, authorization('admin'), (req, res) => {   
  res.json({ message: 'This is an admin route'});
});

module.exports = router;