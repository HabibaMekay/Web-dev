const express = require('express');
const router = express.Router();
const Task = require('./Task'); 


router.get('/', async (req, res) => {
    const tasks = await Task.findAll();
    res.json(tasks);
});


router.get('/:id', async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
});

router.get('/user/:id', async (req, res) => {
    const tasks = await Task.findAll({ where: { userId: req.params.id } });
    if (tasks.length === 0) {
        return res.status(404).json({ error: 'No tasks found for this user' });
    }
    res.json(tasks);
});



router.post('/', async (req, res) => {
    if (!req.body.userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }
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