const todoModel = require('../models/todoModel');

const getAllTodos = (req, res) => {
  const todos = todoModel.getAll();
  res.json({ success: true, data: todos });
};

const createTodo = (req, res) => {
  const { title, description } = req.body;

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Title is required and must be a non-empty string',
    });
  }

  const todo = todoModel.create({ title: title.trim(), description });
  res.status(201).json({ success: true, data: todo });
};

const updateTodo = (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  const updated = todoModel.update(id, changes);
  if (!updated) {
    return res.status(404).json({
      success: false,
      message: `Todo with id '${id}' not found`,
    });
  }

  res.json({ success: true, data: updated });
};

const deleteTodo = (req, res) => {
  const { id } = req.params;

  const deleted = todoModel.remove(id);
  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: `Todo with id '${id}' not found`,
    });
  }

  res.json({ success: true, message: 'Todo deleted successfully', data: deleted });
};

module.exports = { getAllTodos, createTodo, updateTodo, deleteTodo };
