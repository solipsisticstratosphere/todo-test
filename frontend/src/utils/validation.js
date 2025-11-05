
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export const usernameRegex = /^[a-zA-Z0-9_-]+$/;

/**
 * 
 * @param {Object} formData - Login form data
 * @returns {Object} - Object with field errors
 */
export const validateLoginForm = (formData) => {
  const errors = {};


  if (!formData.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }


  if (!formData.password?.trim()) {
    errors.password = 'Password is required';
  }

  return errors;
};

/**
 * 
 * @param {Object} formData - Registration form data
 * @returns {Object} - Object with field errors
 */
export const validateRegisterForm = (formData) => {
  const errors = {};


  if (!formData.username?.trim()) {
    errors.username = 'Username is required';
  } else if (formData.username.length < 3) {
    errors.username = 'Username must be at least 3 characters';
  } else if (formData.username.length > 50) {
    errors.username = 'Username must be less than 50 characters';
  } else if (!usernameRegex.test(formData.username)) {
    errors.username = 'Username can only contain letters, numbers, hyphens and underscores';
  }

 
  if (!formData.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }


  if (!formData.password?.trim()) {
    errors.password = 'Password is required';
  } else if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }


  if (!formData.confirmPassword?.trim()) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};

/**
 * 
 * @param {Object} formData - Task form data
 * @returns {Object} - Object with field errors
 */
export const validateTaskForm = (formData) => {
  const errors = {};


  if (!formData.title?.trim()) {
    errors.title = 'Title is required';
  } else if (formData.title.length > 200) {
    errors.title = 'Title must be less than 200 characters';
  } else if (formData.title.trim().length < 1) {
    errors.title = 'Title cannot be empty';
  }

  if (formData.description && formData.description.length > 5000) {
    errors.description = 'Description must be less than 5000 characters';
  }


  const validStatuses = ['todo', 'in progress', 'done'];
  if (!validStatuses.includes(formData.status)) {
    errors.status = 'Invalid status value';
  }

  return errors;
};

/**
 * 
 * @param {Object} errors - Validation errors object
 * @returns {boolean} - True if there are errors
 */
export const hasValidationErrors = (errors) => {
  return Object.keys(errors).length > 0;
};

/**
 * 
 * @param {Object} validationErrors - Current validation errors
 * @param {string} fieldName - Field name to clear
 * @returns {Object} - Updated validation errors
 */
export const clearFieldError = (validationErrors, fieldName) => {
  if (validationErrors[fieldName]) {
    return {
      ...validationErrors,
      [fieldName]: '',
    };
  }
  return validationErrors;
};
