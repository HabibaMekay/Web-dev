const express = require('express');
const router = express.Router();
const Author = require('./author'); 


router.get('/', async (req, res) => {
    const authors = await Author.findAll();
    res.json(authors);
});


router.post('/', async (req, res) => {
    const author = await Author.create(req.body);
    res.status(201).json(author);
});

router.put('/:id', async (req, res) => {
    const [updated] = await Author.update(req.body, { where: { id: req.params.id } });
    res.json(updated);
});


router.delete('/:id', async (req, res) => {
    const deleted = await Author.destroy({ where: { id: req.params.id } });
      res.status(204).send();
});

module.exports = router;