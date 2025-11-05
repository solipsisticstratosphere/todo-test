const { body } = require('express-validator');


const validateEmail = () =>
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email');

const validatePassword = (minLength = 6) =>
  body('password')
    .isLength({ min: minLength })
    .withMessage(`Password must be at least ${minLength} characters`);

const validateUsername = () =>
  body('username')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Username must be 3-50 characters');

const registerValidation = [
  validateUsername(),
  validateEmail(),
  validatePassword(6)
];

const loginValidation = [
  validateEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const validateTaskTitle = () =>
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title max length is 200 characters');

const validateTaskDescription = () =>
  body('description')
    .optional()
    .trim();

const validateTaskStatus = () =>
  body('status')
    .optional()
    .isIn(['todo', 'in progress', 'done'])
    .withMessage('Invalid status value');

const createTaskValidation = [
  validateTaskTitle(),
  validateTaskDescription(),
  validateTaskStatus()
];

const updateTaskValidation = [
  validateTaskTitle().optional(),
  validateTaskDescription(),
  validateTaskStatus()
];

module.exports = {
  validateEmail,
  validatePassword,
  validateUsername,
  validateTaskTitle,
  validateTaskDescription,
  validateTaskStatus,

  registerValidation,
  loginValidation,
  createTaskValidation,
  updateTaskValidation
};
