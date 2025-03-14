const express = require('express');
const { sequelize } = require('./routes/authors/database');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// 3ady b-import el routes zy abl kda
const bookRoutes = require('./routes/posts/post');
const authorRoutes = require('./routes/authors/authorR.js');

app.use('/posts', bookRoutes);
app.use('/authors', authorRoutes);

// from tutorial 5
async function main() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    await sequelize.sync(); 
    console.log('Database schema synchronized.');

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Error:', error.message || error);
  }
}

main();