// index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
console.log(process.env.PWD);
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(`mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URI}:27017/tododb`);


const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Todo model
const todoSchema = new mongoose.Schema({
  task: String,
});

const Todo = mongoose.model('Todo', todoSchema);

// Routes
app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/add', async (req, res) => {
  const { task } = req.body;
  const newTodo = new Todo({ task });

  await newTodo.save();
  res.json('Todo added!');
});
app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      await Todo.findByIdAndDelete(id);
      res.json('Todo deleted!');
    } catch (error) {
      console.error(error);
      res.status(500).json('Error deleting todo');
    }
  });
  app.put('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
  
    try {
      await Todo.findByIdAndUpdate(id, { task });
      res.json('Todo updated!');
    } catch (error) {
      console.error(error);
      res.status(500).json('Error updating todo');
    }
  });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
