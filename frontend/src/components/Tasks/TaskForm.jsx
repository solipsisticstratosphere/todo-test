import { useState, useEffect } from 'react';
import { useCreateTask, useUpdateTask } from '../../hooks/useTasks';
import styles from './Tasks.module.css';

const TaskForm = ({ editingTask, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo',
  });

  const createTask = useCreateTask();
  const updateTask = useUpdateTask();

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description || '',
        status: editingTask.status,
      });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingTask) {
        await updateTask.mutateAsync({ id: editingTask.id, data: formData });
        onCancelEdit();
      } else {
        await createTask.mutateAsync(formData);
      }
      setFormData({ title: '', description: '', status: 'todo' });
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleCancel = () => {
    setFormData({ title: '', description: '', status: 'todo' });
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <div className={styles.taskFormContainer}>
      <h2>{editingTask ? 'Edit Task' : 'Create New Task'}</h2>
      <form onSubmit={handleSubmit} className={styles.taskForm}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            maxLength={200}
            placeholder="Enter task title"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Enter task description (optional)"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="todo">To Do</option>
            <option value="in progress">In Progress</option>
            <option value="done">Done</option>
          </select>
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
          {editingTask && (
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
