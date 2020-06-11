const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

// routes

// create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const addTodo = await pool.query(
      "INSERT INTO todo(description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(addTodo.rows[0]);
    console.log(req.body);
  } catch (err) {
    console.log(err.message);
  }
});
// get all todos
app.get("/todos", async (req, res) => {
  try {
    const getAllTodos = await pool.query("SELECT * FROM todo");
    res.json(getAllTodos.rows);
  } catch (error) {}
});

// get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getTodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(getTodo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json("Update successful.");
  } catch (err) {
    console.log(err.message);
  }
});

// delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTask = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Task: Deleted.");
  } catch (error) {
    console.log(err.message);
  }
});

app.use(express.json());
app.listen(5000, () => {
  console.log("Server2 started on port 5000.");
});
