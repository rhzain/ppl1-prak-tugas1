const { v4: uuidv4 } = require('uuid');

let todos = [];

const getAll = () => todos;

const getById = (id) => todos.find((todo) => todo.id === id);

const create = ({ title, description = '' }) => {
  const todo = {
    id: uuidv4(),
    title,
    description,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  todos.push(todo);
  return todo;
};

const update = (id, changes) => {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) return null;
  todos[index] = { ...todos[index], ...changes };
  return todos[index];
};

const remove = (id) => {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) return null;
  const [deleted] = todos.splice(index, 1);
  return deleted;
};

// For testing: reset the store
const reset = () => {
  todos = [];
};

module.exports = { getAll, getById, create, update, remove, reset };
