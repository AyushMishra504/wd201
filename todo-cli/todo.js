const todoList = () => {
  const all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };

  const todayDate = new Date().toISOString().split('T')[0];

  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    return all.filter((todo) => todo.dueDate < todayDate && !todo.completed);
  };

  const dueToday = () => {
    return all.filter((todo) => todo.dueDate === todayDate);
  };

  const dueLater = () => {
    return all.filter((todo) => todo.dueDate > todayDate);
  };

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
    toDisplayableList,
  };
};

// ####################################### #
// DO NOT CHANGE ANYTHING BELOW THIS LINE. #
// ####################################### #

const todos = todoList();
export default todos;