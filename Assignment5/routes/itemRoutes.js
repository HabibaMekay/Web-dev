const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/', itemController.getItems);
router.post('/add', itemController.addItem);
router.post('/remove', itemController.removeItem);

module.exports = router;
