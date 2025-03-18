const express = require('express');
const router = express.Router();
const Task = require('./Task'); 


router.get('/', async (req, res) => {
    const tasks = await Task.findAll();
    res.json(tasks);
});


router.post('/', async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json(task);
});

router.put('/:id', async (req, res) => {
    const [updated] = await Task.update(req.body, { where: { id: req.params.id } });
    res.json(updated);
});


router.delete('/:id', async (req, res) => {
    const deleted = await Task.destroy({ where: { id: req.params.id } });
      res.status(204).send();
});

module.exports = router;