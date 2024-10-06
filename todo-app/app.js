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
(async () => {
  await Todo.addTodo({
    title: "Complete Physics Assignment",
    dueDate: "2024-10-10",
  });
  await Todo.addTodo({ title: "Grocery Shopping", dueDate: "2024-10-07" });
  await Todo.addTodo({ title: "Prepare for Midterms", dueDate: "2024-10-15" });
})();

app.get("/todos", async function (_request, response) {
  console.log("Processing list of all Todos ...");
  if (request.accepts("html")) {
    response.render("index", allTodos);
  } else {
    response.json(allTodos);
  }
  const todos = await Todo.findAll();
  response.json(todos);
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

module.exports = app;
