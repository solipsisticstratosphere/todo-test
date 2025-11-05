const { Task } = require('../models');
const { Op } = require('sequelize');

exports.getTasks = async (req, res) => {
  try {
    const { status } = req.query;
    const userId = req.userId;

    const where = { userId };

    if (status && ['todo', 'in progress', 'done'].includes(status)) {
      where.status = status;
    }

    const tasks = await Task.findAll({
      where,
      order: [['createdAt', 'DESC']]
    });

    res.json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const task = await Task.findOne({
      where: { id, userId }
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const userId = req.userId;

    const task = await Task.create({
      title,
      description,
      status: status || 'todo',
      userId
    });

    res.status(201).json(task);
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const userId = req.userId;

    const task = await Task.findOne({
      where: { id, userId }
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.update({
      title: title !== undefined ? title : task.title,
      description: description !== undefined ? description : task.description,
      status: status !== undefined ? status : task.status
    });

    res.json(task);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const task = await Task.findOne({
      where: { id, userId }
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.destroy();

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
