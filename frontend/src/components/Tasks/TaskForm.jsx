import { useState, useEffect } from 'react';
import { useCreateTask, useUpdateTask } from '../../hooks/useTasks';
import { validateTaskForm, clearFieldError } from '../../utils/validation';
import styles from './Tasks.module.css';

const TaskForm = ({ editingTask, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo',
  });
  const [validationErrors, setValidationErrors] = useState({});

  const createTask = useCreateTask();
  const updateTask = useUpdateTask();

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description || '',
        status: editingTask.status,
      });
    } else {
      setFormData({ title: '', description: '', status: 'todo' });
    }
  }, [editingTask]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    
    setValidationErrors(clearFieldError(validationErrors, name));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateTaskForm(formData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});

    try {
      if (editingTask) {
        await updateTask.mutateAsync({ id: editingTask.id, data: formData });
      } else {
        await createTask.mutateAsync(formData);
      }
      setFormData({ title: '', description: '', status: 'todo' });
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleCancel = () => {
    setFormData({ title: '', description: '', status: 'todo' });
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.taskForm}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={validationErrors.title ? styles.inputError : ''}
            required
            maxLength={200}
            placeholder="Enter task title"
          />
          {validationErrors.title && (
            <span className={styles.fieldError}>{validationErrors.title}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={validationErrors.description ? styles.inputError : ''}
            rows={4}
            maxLength={5000}
            placeholder="Enter task description (optional)"
            style={{ resize: 'none' }}
          />
          {validationErrors.description && (
            <span className={styles.fieldError}>{validationErrors.description}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={validationErrors.status ? styles.inputError : ''}
          >
            <option value="todo">To Do</option>
            <option value="in progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          {validationErrors.status && (
            <span className={styles.fieldError}>{validationErrors.status}</span>
          )}
        </div>

      <div className={styles.formActions}>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={createTask.isPending || updateTask.isPending}
        >
          {createTask.isPending || updateTask.isPending
            ? 'Saving...'
            : editingTask
            ? 'Update Task'
            : 'Create Task'}
        </button>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
