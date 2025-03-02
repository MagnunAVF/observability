const express = require("express");

require("dotenv").config();

const db = require("./db");
const todosDb = require("./db/todos");

const app = express();

app.use(express.json());

app.get("/health", async (_req, res) => {
  try {
    await db.checkDbHealth();

    res.status(200).json({
      status: "OK",
      message: "Service and database are healthy",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: "DOWN",
    });
  }
});

app.post("/todos", async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      error: "Both title and description are required",
    });
  }

  try {
    const result = await todosDb.createTodo(title, description);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: "Internal Server Error" });
  }
});

app.get("/todos", async (_req, res) => {
  try {
    const result = await todosDb.getTodos();
    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: "Internal Server Error" });
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await todosDb.getTodoById(id);

    if (!result) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: "Internal Server Error" });
  }
});

app.put("/todos/:id", async (req, res) => {
  const { title, description, completed } = req.body;

  try {
    const result = await todosDb.updateTodoById(
      req.params.id,
      title,
      description,
      completed
    );

    if (!result) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: "Internal Server Error" });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const result = await todosDb.deteleTodoById(req.params.id);

    if (!result) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
