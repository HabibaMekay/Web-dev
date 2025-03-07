const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/booksbd', {
  serverSelectionTimeoutMS: 30000,
});

const userSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String,
});

const User = mongoose.model('User', userSchema);

module.exports = {
  getAllUsers: async () => await User.find(),
  getUserById: async (id) => await User.findOne({ id }),
  createUser: async (name, email) => {
    const lastUser = await User.findOne().sort({ id: -1 });
    const newID = lastUser.id + 1;
    const newUser = new User({ id: newID, name, email });
    await newUser.save();
    return newUser;
  },

  updateUser: async (id, name, email) => {
    const user = await User.findOne({ id });
    if (!user) return null;
    user.name = name;
    user.email = email;
    await user.save();
    return user;
  },

  deleteUser: async (id) => {
    const result = await User.deleteOne({ id });
    if (result.deletedCount === 0) return null;
    return result;
  },
};
