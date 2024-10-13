/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const express = require("express");
const app = express();
const { Todo } = require("./models");
const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

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

app.get("/todos/:id", async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.post("/todos", async (request, response) => {
  try {
    const todo = await Todo.addTodo({
      title: request.body.title,
      dueDate: request.body.dueDate,
    });
    return response.redirect("/");
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

module.exports = app;
