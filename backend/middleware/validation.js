const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
      errors: errors.array()
    });
  }
  next();
};

const validateEmail = () =>
  body('email')
    .trim()
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
    .escape()
    .isLength({ min: 3, max: 50 })
    .withMessage('Username must be 3-50 characters')
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage('Username can only contain letters, numbers, hyphens and underscores');

const validateTaskTitle = () =>
  body('title')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title max length is 200 characters')
    .matches(/^[^<>]*$/)
    .withMessage('Title contains invalid characters');

const validateTaskDescription = () =>
  body('description')
    .optional()
    .trim()
    .escape()
    .isLength({ max: 5000 })
    .withMessage('Description max length is 5000 characters');

const validateTaskStatus = () =>
  body('status')
    .optional()
    .isIn(['todo', 'in progress', 'done'])
    .withMessage('Invalid status value');

const registerValidation = [
  validateUsername(),
  validateEmail(),
  validatePassword(6),
  handleValidationErrors
];

const loginValidation = [
  validateEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

const createTaskValidation = [
  validateTaskTitle(),
  validateTaskDescription(),
  validateTaskStatus(),
  handleValidationErrors
];

const updateTaskValidation = [
  validateTaskTitle().optional(),
  validateTaskDescription(),
  validateTaskStatus(),
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
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
