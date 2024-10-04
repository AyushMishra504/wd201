/* eslint-disable no-unused-vars */
const {request,response} = require('express')
const express = require('express')//imports the EXPRESS module installed via NPM
const app= express() 
const {Todo} = require("./models")
const bodyParser = require("body-parser")
app.use(bodyParser.json())

app.get("/todos",(request,response) => {
    console.log("Todo List")
})

app.post("/todos", async (request,response) => {
    console.log("creating a Todo", request.body)
    try {
        const todo= await Todo.addTodo({title:request.body.title, dueDate: request.body.dueDate, completed: false })
        return response.json(todo)
    }catch (error) {
            console.log(error)
            return response.status(422).json(error)
    }})

app.put("/todos/:id/markAsCompleted",async (request,response) => {
    console.log("We have to update a Todo with ID", request.params.id)
    const todo= await Todo.findByPk(request.params.id)
    try{
        const updated_todo=await todo.markAsCompleted()
        return response.json(updated_todo)
}catch(error){
    console.log(error)
    return response.status(422).json(error)
}})

app.delete("/todos/:id",(request,response) => {
    console.log("Delete a Todo with ID", request.params.id)
    
})
module.exports = app
