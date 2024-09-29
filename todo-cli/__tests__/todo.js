const todoList = require('../todo');
const { all, markAsComplete, add } = todoList();
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

describe('TodoList test suite', () => {
  let list;
  beforeEach(() => {
    list = todoList();
  });

  test('should add a new todo', () => {
    expect(list.all.length).toBe(0);
    list.add({
      title: 'Test Todo',
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(list.all.length).toBe(1);
  });

  test('should mark a todo as completed', () => {
    list.add({
      title: 'Test Todo',
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(list.all[0].completed).toBe(false);
    list.markAsComplete(0);
    expect(list.all[0].completed).toBe(true);
  });

  test('should retrieve overdue items', () => {
    list.add({
      title: 'Overdue',
      completed: false,
      dueDate: yesterday,
    });
    const overdueItems = list.overdue();
    expect(overdueItems.length).toBe(1);
  });

  test('should retrieve today items', () => {
    list.add({
      title: 'Overdue',
      completed: false,
      dueDate: today,
    });
    const overdueItems = list.dueToday();
    expect(overdueItems.length).toBe(1);
  });

  test('should retrieve due later items', () => {
    list.add({
      title: 'Overdue',
      completed: false,
      dueDate: tomorrow,
    });
    const overdueItems = list.dueLater();
    expect(overdueItems.length).toBe(1);
  });
});
