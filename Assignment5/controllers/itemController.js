const Item = require('../models/item');

// Fetch all items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.render('index', { items });
  } catch (err) {
    res.status(500).send('Error fetching items');
  }
};

// Add new item
exports.addItem = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.redirect('/');
    await new Item({ name }).save();
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error saving item');
  }
};


exports.removeItem = async (req, res) => {
  try {
    const { id } = req.body; 
    if (!id) return res.redirect('/');
    await Item.findByIdAndDelete(id); 
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error removing item');
  }
};