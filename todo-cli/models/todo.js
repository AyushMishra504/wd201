// models/todo.js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
     
      console.log("\n");

      console.log("Due Today");
      
      console.log("\n");

      console.log("Due Later");
      
    }

    static async overdue() {
      return all.filter((todo) => todo.dueDate < today);
    }

    static async dueToday() {
       return all.filter((todo) => todo.dueDate === today);
    }

    static async dueLater() {
      return all.filter((todo) => todo.dueDate > today);
    }

    static async markAsComplete(id) {
      all[index].completed = true;

    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
  }
  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
    tableName: 'todos',
  });
  return Todo;
};
