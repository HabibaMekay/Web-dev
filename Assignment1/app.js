const express = require('express');
const app = express();
const port = 3000;

let books = [
  { id: 1, title: 'Red Queen', author: 'Victoria Aveyard' },
  { id: 2, title: 'The Young Elites', author: 'Marie  Lu' },
  { id: 3, title: 'Throne of glass', author: 'Sarah J. Maas' },
  { id: 4, title: 'The Shadows Between Us', author: 'Tricia Levenller' },
  { id: 5, title: 'Three Dark Crowns', author: 'Kendare Blake' },
  { id: 6, title: 'The Poppy War', author: 'Kuang, R.F.' },
  { id: 7, title: 'Three Dark Crowns', author: 'Kendare Blake' },
  { id: 8, title: 'Heartless Hunter', author: 'Kristen Ciccarelli' },
  { id: 9, title: 'Fourth Wing', author: 'Rebecca Yarros' },
  { id: 10, title: 'The Bridge Kingdom', author: 'Danielle L. Jenson' },
  { id: 11, title: 'Touch of Power', author: 'Maria V. Snyder' },
  { id: 12, title: 'Heartless', author: 'Marissa Meyer' },
  { id: 13, title: 'Vicious', author: 'Victoria Schwab' },
];

//My Real Book Recommendations, 3ayza bonus if u read one of them
  
app.use(express.json());

app.get('/', (req, res) => {
  res.json(books);
});

app.get('/books/:id', (req, res) => {
  const bId = parseInt(req.params.id);
  const book = books.find((b) => b.id === bId);

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  res.json(book);
});

app.post('/books', (req, res) => {

  const book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
  };

  books.push(book);
  res.json(book);
});


app.put('/books/:id', (req, res) => { //update bec i forget
  const bId = parseInt(req.params.id);
  const book = books.find(b => b.id === bId);

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  book.title = req.body.title;
  book.author = req.body.author;

  
});

app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);

  const index = books.findIndex((b) => b.id === bookId);

  if (index === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  books.splice(index, 1);
  res.status(204).send();
});


app.listen(port, () => {
  console.log(`Server is running:" http://localhost:${port}`);
});
