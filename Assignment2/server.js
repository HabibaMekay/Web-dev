const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const bookRoutes = require('./routes/books/books');
app.use('/books', bookRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
