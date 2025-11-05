const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
const { createTaskValidation, updateTaskValidation } = require('../middleware/validation');

router.use(auth);

// Get all tasks
router.get('/', taskController.getTasks);

// Get task by ID
router.get('/:id', taskController.getTaskById);

// Create new task
router.post('/', createTaskValidation, taskController.createTask);

// Update task
router.put('/:id', updateTaskValidation, taskController.updateTask);

// Delete task
router.delete('/:id', taskController.deleteTask);

module.exports = router;
