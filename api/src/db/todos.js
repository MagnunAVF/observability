const db = require("./index");

const createTodo = async (title, description) => {
  const result = await db.query(
    "INSERT INTO todos (title, description) VALUES ($1, $2) RETURNING *",
    [title, description]
  );

  return result.rows[0];
};

const getTodos = async () => {
  const result = await db.query("SELECT * FROM todos ORDER BY id");

  return result.rows;
};

const getTodoById = async (id) => {
  const result = await db.query("SELECT * FROM todos WHERE id = $1", [id]);

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
};

const updateTodoById = async (id, title, description, completed) => {
  const result = await db.query(
    `UPDATE todos SET
          title = COALESCE($1, title),
          description = COALESCE($2, description),
          completed = COALESCE($3, completed),
          updated_at = NOW()
        WHERE id = $4
        RETURNING *`,
    [title, description, completed, id]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
};

const deteleTodoById = async (id) => {
  const result = await db.query("DELETE FROM todos WHERE id = $1 RETURNING *", [
    id,
  ]);

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
};

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodoById,
  deteleTodoById,
};
