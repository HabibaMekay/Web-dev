const User = require('./user');

(async () => {
  try {
    const newUser = await User.create({
      name: 'Alice',
      age: 25,
      city: 'New York',
    });
    const users = await User.find();
    await User.updateOne({ name: 'Alice' }, { age: 26 });
    await User.deleteOne({ name: 'Alice' });
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
})();
