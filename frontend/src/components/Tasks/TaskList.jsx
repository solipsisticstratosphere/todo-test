import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTasks, useDeleteTask, useUpdateTask } from '../../hooks/useTasks';
import TaskForm from './TaskForm';
import Modal from '../Modal/Modal';
import styles from './Tasks.module.css';

const TaskList = () => {
  const [filter, setFilter] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: tasks, isLoading, error } = useTasks(filter);
  const deleteTask = useDeleteTask();
  const updateTask = useUpdateTask();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask.mutate(id);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    updateTask.mutate({ id, data: { status: newStatus } });
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCreateNew = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleTaskSuccess = () => {
    handleCloseModal();
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading tasks...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error loading tasks: {error.message}</div>;
  }

  return (
    <div className={styles.taskListContainer}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h1>My Tasks</h1>
          <button className={styles.createButton} onClick={handleCreateNew}>
            <Plus size={20} />
            Create Task
          </button>
        </div>
        <div className={styles.filterButtons}>
          <button
            className={filter === '' ? styles.filterActive : styles.filterButton}
            onClick={() => setFilter('')}
          >
            All
          </button>
          <button
            className={filter === 'todo' ? styles.filterActive : styles.filterButton}
            onClick={() => setFilter('todo')}
          >
            To Do
          </button>
          <button
            className={filter === 'in progress' ? styles.filterActive : styles.filterButton}
            onClick={() => setFilter('in progress')}
          >
            In Progress
          </button>
          <button
            className={filter === 'done' ? styles.filterActive : styles.filterButton}
            onClick={() => setFilter('done')}
          >
            Done
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
      >
        <TaskForm
          editingTask={editingTask}
          onSuccess={handleTaskSuccess}
          onCancel={handleCloseModal}
        />
      </Modal>

      <div className={styles.tasksList}>
        {tasks && tasks.length === 0 ? (
          <div className={styles.emptyState}>No tasks found. Create your first task!</div>
        ) : (
          tasks?.map((task) => (
            <div key={task.id} className={styles.taskCard}>
              <div className={styles.taskHeader}>
                <h3>{task.title}</h3>
                <div className={styles.taskActions}>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              {task.description && (
                <p className={styles.taskDescription}>{task.description}</p>
              )}
              <div className={styles.taskFooter}>
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  className={`${styles.statusSelect} ${styles[task.status.replace(' ', '')]}`}
                >
                  <option value="todo">To Do</option>
                  <option value="in progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
                <span className={styles.taskDate}>
                  {new Date(task.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
