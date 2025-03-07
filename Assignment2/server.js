const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Import routes
const bookRoutes = require('./routes/books/book');
const userRoutes = require('./routes/users/user');
const authorRoutes = require('./routes/authors/author');
const transactionRoutes = require('./routes/transactions/transaction');

app.use('/books', bookRoutes);
app.use('/users', userRoutes);
app.use('/authors', authorRoutes);
app.use('/transactions', transactionRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
