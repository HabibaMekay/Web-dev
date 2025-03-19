const express = require('express');
const router = express.Router();
const User = require('./User'); 
const Task = require('../task/taskRouter'); 


router.get('/', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

router.post('/', async (req, res) => {
    const user = await User.create(req.body);
    res.status(201).json(user);
});

router.put('/:id', async (req, res) => {
    const [updated] = await User.update(req.body, { where: { id: req.params.id } });
    res.json(updated);
});


router.delete('/:id', async (req, res) => {
    const deleted = await User.destroy({ where: { id: req.params.id } });
      res.status(204).send();
});

module.exports = router;




