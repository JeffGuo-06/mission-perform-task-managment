import TaskItem from './TaskItem'
import './TaskList.css'

function TaskList({ tasks, onTaskClick, onStatusChange }) {
  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <p>No tasks yet. Create your first task above!</p>
      </div>
    )
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onTaskClick={onTaskClick}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  )
}

export default TaskList
