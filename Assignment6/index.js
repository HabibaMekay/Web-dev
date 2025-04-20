require('dotenv').config();
const express = require('express');
const protectedRoutes = require('./routes/roleRoutes');
const userRoutes = require('./routes/userRouter');

const app = express();
app.use(express.json());


app.use('/api', protectedRoutes);
app.use('/api', userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));