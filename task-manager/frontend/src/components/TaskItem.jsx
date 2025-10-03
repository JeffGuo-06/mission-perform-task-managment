import { useState, useEffect } from 'react'
import './TaskItem.css'
import StatusDropdown from './StatusDropdown'

function TaskItem({ task, onTaskClick, onStatusChange }) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationColor, setAnimationColor] = useState('')

  const statusColorMap = {
    'To Do': '#9E9E9E',
    'In Progress': '#2196F3',
    'Done': '#4CAF50'
  }

  const handleStatusChange = (newStatus) => {
    // Trigger animation with new status color
    setAnimationColor(statusColorMap[newStatus])
    setIsAnimating(true)

    // Call the actual status change
    onStatusChange(task._id, { ...task, status: newStatus })

    // Remove animation after it completes
    setTimeout(() => {
      setIsAnimating(false)
    }, 900)
  }

  const handleCardClick = () => {
    onTaskClick(task)
  }

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'To Do':
        return 'status-todo'
      case 'In Progress':
        return 'status-progress'
      case 'Done':
        return 'status-done'
      default:
        return ''
    }
  }

  return (
    <div
      className={`task-item ${getStatusClass(task.status)}`}
      onClick={handleCardClick}
    >
      <div className="task-item-content">
        {isAnimating && (
          <div
            className="status-change-animation"
            style={{ backgroundColor: animationColor }}
          />
        )}

        <div className="task-header">
          <h3>{task.title}</h3>
          <div onClick={(e) => e.stopPropagation()}>
            <StatusDropdown
              value={task.status}
              onChange={handleStatusChange}
              variant="pill"
            />
          </div>
        </div>

        {task.description && (
          <p className="task-description">{task.description}</p>
        )}

        <div className="task-footer">
          <span className="task-date">
            Created: {formatDate(task.createdAt)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TaskItem
