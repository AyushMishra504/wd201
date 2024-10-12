/* eslint-disable no-undef */

const express = require("express");
const app = express();
const { Todo } = require("./models");
const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (request, response) => {
  const allTodos = await Todo.getTodos();
  response.render("index", { allTodos: allTodos });
});

app.get("/todos", async (req, res) => {
  try {
    // Fetch all todos from the database
    const todos = await Todo.findAll();

    // Group todos based on due date
    const overdue = todos.filter(
      (todo) => new Date(todo.dueDate) < new Date() && !todo.completed
    );
    const dueToday = todos.filter(
      (todo) =>
        new Date(todo.dueDate).toDateString() === new Date().toDateString() &&
        !todo.completed
    );
    const dueLater = todos.filter(
      (todo) => new Date(todo.dueDate) > new Date() && !todo.completed
    );

    // Render todos.ejs and pass the grouped todos
    res.render("todos", { overdue, dueToday, dueLater });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching todos");
  }
});

app.get("/todos/:id", async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.post("/todos", async function (request, response) {
  try {
    const todo = await Todo.addTodo(request.body);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.put("/todos/:id/markAsCompleted", async function (request, response) {
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updatedTodo = await todo.markAsCompleted();
    return response.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.delete("/todos/:id", async function (request, response) {
  console.log("We have to delete a Todo with ID: ", request.params.id);
  const result = await Todo.destroy({ where: { id: request.params.id } });
  if (result > 0) {
    return response.json(true);
  } else {
    return response.json(false);
  }
});

app.get("/", async (req, res) => {
  try {
    const allTodos = await Todo.findAll();
    const today = new Date().toISOString().split("T")[0];

    const overdueTodos = allTodos.filter(
      (todo) => todo.dueDate < today && !todo.completed
    );
    const dueTodayTodos = allTodos.filter(
      (todo) => todo.dueDate === today && !todo.completed
    );
    const dueLaterTodos = allTodos.filter(
      (todo) => todo.dueDate > today && !todo.completed
    );

    res.render("index", { overdueTodos, dueTodayTodos, dueLaterTodos });
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = app;
