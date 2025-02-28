const express = require("express");

require("dotenv").config();

const app = express();

app.use(express.json());

let todos = [];
let currentId = 1;

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Service is healthy",
    timestamp: new Date().toISOString(),
  });
});

app.post("/todos", (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  if (!description) {
    return res.status(400).json({ error: "Description is required" });
  }

  const currentTime = new Date().toISOString();
  const newTodo = {
    id: currentId++,
    title,
    description,
    completed: false,
    createdAt: currentTime,
    updatedAt: currentTime,
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.get("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.json(todo);
});

app.put("/todos/:id", (req, res) => {
  const todoIndex = todos.findIndex((t) => t.id === parseInt(req.params.id));

  if (todoIndex === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  const existingTodo = todos[todoIndex];
  const updatedTodo = {
    ...existingTodo,
    title: req.body.title || existingTodo.title,
    description: req.body.description || existingTodo.description,
    completed:
      req.body.completed !== undefined
        ? req.body.completed
        : existingTodo.completed,
    updatedAt: new Date().toISOString(),
  };

  todos[todoIndex] = updatedTodo;

  res.json(updatedTodo);
});

app.delete("/todos/:id", (req, res) => {
  const todoIndex = todos.findIndex((t) => t.id === parseInt(req.params.id));

  if (todoIndex === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  todos.splice(todoIndex, 1);

  res.status(204).send();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
