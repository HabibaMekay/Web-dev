const express = require('express');
const { sequelize } = require('./database');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const taskRoutes = require('./task/taskRouter');

app.use('/tasks', taskRoutes);

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