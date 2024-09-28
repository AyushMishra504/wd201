const todoList = () => {
  const all = []; 
  const add = (todoItem) => {
    all.push(todoItem);
  }

  const todayDate = new Date().toISOString().split("T")[0];
  
  const markAsComplete = (index) => {
    all[index].completed = true;
  }

  const overdue = () => {    
    return all.filter(todo => todo.dueDate < todayDate && !todo.completed);
  }

  const dueToday = () => {    
    return all.filter(todo => todo.dueDate === todayDate);
  }

  const dueLater = () => {     
    return all.filter(todo => todo.dueDate > todayDate);
  }

  const toDisplayableList = (list) => {
    return list.map(todo => {
      const checkbox = todo.completed ? '[x]' : '[ ]'; 
       return todo.completed 
      ? `${checkbox} ${todo.title}` 
      : todo.dueDate === new Date().toISOString().split("T")[0]
      ? `${checkbox} ${todo.title}` // No date for tasks due today
      : `${checkbox} ${todo.title} ${todo.dueDate}`; 
    }).join('\n'); 
  }

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList
  };
};

// ####################################### #
// DO NOT CHANGE ANYTHING BELOW THIS LINE. #
// ####################################### #

const todos = todoList();

const formattedDate = d => {
  return d.toISOString().split("T")[0];
}

var dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1))
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
);

todos.add({ title: 'Submit assignment', dueDate: yesterday, completed: false });
todos.add({ title: 'Pay rent', dueDate: today, completed: true });
todos.add({ title: 'Service Vehicle', dueDate: today, completed: false });
todos.add({ title: 'File taxes', dueDate: tomorrow, completed: false });
todos.add({ title: 'Pay electric bill', dueDate: tomorrow, completed: false });

console.log("My Todo-list\n");

console.log("Overdue");
var overdues = todos.overdue();
var formattedOverdues = todos.toDisplayableList(overdues);
console.log(formattedOverdues);
console.log("\n");

console.log("Due Today");
let itemsDueToday = todos.dueToday();
let formattedItemsDueToday = todos.toDisplayableList(itemsDueToday);
console.log(formattedItemsDueToday);
console.log("\n");

console.log("Due Later");
let itemsDueLater = todos.dueLater();
let formattedItemsDueLater = todos.toDisplayableList(itemsDueLater);
console.log(formattedItemsDueLater);
console.log("\n\n");
