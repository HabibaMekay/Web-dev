const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/my_database');

const con = mongoose.connection;
con.on('error', console.error.bind(console, 'Connection error:'));
con.once('open', () => {
  console.log('Connected to MongoDB');
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  city: { type: String },
});

const User = mongoose.model('User', userSchema);

module.exports = User, mongoose;
