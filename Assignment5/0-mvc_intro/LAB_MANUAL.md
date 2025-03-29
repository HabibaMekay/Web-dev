# **MVC with Node.js, Express, Mongoose, and Pug**

## **Lab Manual**

### **Objective**

To understand and implement the **Model-View-Controller (MVC)** pattern using:

- **Node.js & Express.js** (Controller & Routing)
- **Mongoose** (Model)
- **Pug** (View Engine)
- **MongoDB** (Database)

---

## **1. Prerequisites**

### **Technologies Required**

- Node.js (Download from [nodejs.org](https://nodejs.org/))
- MongoDB (Local or cloud-based [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### **Install Required Dependencies**

```sh
mkdir 0-mvc_intro && cd 0-mvc_intro
npm init -y
npm install express mongoose pug dotenv
```

---

## **2. Project Structure**

```
mvc-example/
│── models/          # Mongoose Schemas
│   └── item.js
│── views/           # Pug Templates
│   └── index.pug
│── controllers/     # Business Logic
│   └── itemController.js
│── routes/          # Express Routing
│   └── itemRoutes.js
│── config/          # Configuration Files
│   └── database.js
│── public/          # (Optional) Static Assets
│── app.js           # Main Application File
│── package.json     # Dependencies & Scripts
│── .env             # Environment Variables
```

---

## **3. Database Configuration**

Create **`config/database.js`** to establish a MongoDB connection.

```js
const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database Connected!');
  } catch (err) {
    console.error('Database Connection Failed:', err);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
```

---

## **4. Creating the Model**

Define the database schema in **`models/item.js`**.

```js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model('Item', itemSchema);
```

---

## **5. Creating the Controller**

Handle business logic in **`controllers/itemController.js`**.

```js
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

// Add a new item
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
```

---

## **6. Defining Routes**

Set up routing in **`routes/itemRoutes.js`**.

```js
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/', itemController.getItems);
router.post('/add', itemController.addItem);

module.exports = router;
```

---

## **7. Creating Views with Pug**

Define the UI in **`views/index.pug`**.

```pug
doctype html
html
  head
    title MVC Example
  body
    h1 Item List
    ul
      each item in items
        li= item.name
    form(action="/add" method="POST")
      input(type="text" name="name" placeholder="Enter item" required)
      button(type="submit") Add Item
```

---

## **8. Configuring the Main Application**

Create **`app.js`**, the entry point of our app.

```js
const express = require('express');
const dotenv = require('dotenv');
const connectToDatabase = require('./config/database');
const itemRoutes = require('./routes/itemRoutes');

dotenv.config();
connectToDatabase();

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));
app.use('/', itemRoutes);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
```

---

## **9. Setting Up Environment Variables**

Create a **`.env`** file for secure configuration.

```
MONGO_URI=mongodb://127.0.0.1:27017/mvc_example
PORT=3000
```

---

## **10. Running the Application**

### **Start MongoDB**

If running locally:

```sh
mongod
```

### **Run the Node.js App**

```sh
node app.js
```

### **Test in Browser**

Open **[http://localhost:3000](http://localhost:3000)**.

- You should see an **item list**.
- Add an item using the **form**.
- The item will be saved in MongoDB and displayed.

---

## **11. Summary**

✔ **Model** → Defines the `Item` schema (Mongoose).  
✔ **View** → Displays items & form (`index.pug`).  
✔ **Controller** → Fetches & saves items (`itemController.js`).  
✔ **Routes** → Defines GET & POST routes (`itemRoutes.js`).  
✔ **Database** → Uses MongoDB (`database.js`).  
✔ **Server** → Runs with Express (`app.js`).

---

## 🎉 **Congratulations!**

You've successfully built an **MVC app with Node.js, Express, Mongoose, and Pug**! 🚀
