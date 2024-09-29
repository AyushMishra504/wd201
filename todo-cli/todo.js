const todoList = () => {
  const formattedDate = (d) => {
    return d.toISOString().split('T')[0];
  };

  var dateToday = new Date();
  const today = formattedDate(dateToday);
  const yesterday = formattedDate(
    new Date(new Date().setDate(dateToday.getDate() - 1))
  );
  const tomorrow = formattedDate(
    new Date(new Date().setDate(dateToday.getDate() + 1))
  );

  let all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    return all.filter((todo) => todo.dueDate < today);
  };

  const dueToday = () => {
    return all.filter((todo) => todo.dueDate === today);
  };

  const dueLater = () => {
    return all.filter((todo) => todo.dueDate > today);
  };

  const toDisplayableList = (list) => {
    return list
      .map(
        (todo) =>
          `${todo.completed ? '[x]' : '[ ]'} ${todo.title}${
            todo.dueDate === today ? '' : ' ' + todo.dueDate
          }`
      )
      .join('\n');
  };

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

module.exports = todoList;
