import { useEffect, useState } from 'react'
import { FiEdit2 } from 'react-icons/fi'
import StatusDropdown from './StatusDropdown'
import './TaskDrawer.css'

function TaskDrawer({ task, isOpen, onClose, onUpdate, onDelete }) {
  const [editingField, setEditingField] = useState(null)
  const [editedTitle, setEditedTitle] = useState('')
  const [editedDescription, setEditedDescription] = useState('')

  // Close drawer on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Update edited values when task changes
  useEffect(() => {
    if (task) {
      setEditedTitle(task.title)
      setEditedDescription(task.description || '')
    }
  }, [task])

  if (!task) {
    return (
      <>
        <div className={`drawer-backdrop ${isOpen ? 'open' : ''}`} />
        <div className={`task-drawer ${isOpen ? 'open' : ''}`} />
      </>
    )
  }

  const statusColorMap = {
    'To Do': '#9E9E9E',
    'In Progress': '#2196F3',
    'Done': '#4CAF50'
  }

  const statusColor = statusColorMap[task.status]

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleStatusChange = (newStatus) => {
    onUpdate(task._id, { ...task, status: newStatus })
    // Update local edited values immediately
    if (task) {
      task.status = newStatus
    }
  }

  const handleTitleEdit = () => {
    setEditingField('title')
  }

  const handleDescriptionEdit = () => {
    setEditingField('description')
  }

  const handleTitleSave = () => {
    if (editedTitle.trim() && editedTitle !== task.title) {
      onUpdate(task._id, { ...task, title: editedTitle })
    } else {
      setEditedTitle(task.title)
    }
    setEditingField(null)
  }

  const handleDescriptionSave = () => {
    if (editedDescription !== task.description) {
      onUpdate(task._id, { ...task, description: editedDescription })
    }
    setEditingField(null)
  }

  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleTitleSave()
    } else if (e.key === 'Escape') {
      setEditedTitle(task.title)
      setEditingField(null)
    }
  }

  const handleDescriptionKeyDown = (e) => {
    if (e.key === 'Escape') {
      setEditedDescription(task.description || '')
      setEditingField(null)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`drawer-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`task-drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-content">
          {/* Task Title */}
          <div className="field-group">
            {editingField === 'title' ? (
              <input
                type="text"
                className="editable-title-input"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onBlur={handleTitleSave}
                onKeyDown={handleTitleKeyDown}
                autoFocus
              />
            ) : (
              <div className="field-display">
                <h2 className="task-title" onClick={handleTitleEdit}>{task.title}</h2>
                <button className="edit-btn" onClick={handleTitleEdit}>
                  <FiEdit2 size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Task Status */}
          <div className="status-dropdown-wrapper">
            <StatusDropdown
              value={task.status}
              onChange={handleStatusChange}
              variant="pill"
            />
          </div>

          {/* Task Description */}
          <div className="field-group">
            {editingField === 'description' ? (
              <textarea
                className="editable-description-input"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                onBlur={handleDescriptionSave}
                onKeyDown={handleDescriptionKeyDown}
                rows={4}
                autoFocus
              />
            ) : (
              <div className="field-display">
                <p className="task-description" onClick={handleDescriptionEdit}>
                  {task.description || 'No description'}
                </p>
                <button className="edit-btn" onClick={handleDescriptionEdit}>
                  <FiEdit2 size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Task Metadata */}
          <div className="task-info">
            <div className="info-section">
              <label>Created</label>
              <p>{formatDate(task.createdAt)}</p>
            </div>
            {task.updatedAt && task.createdAt !== task.updatedAt && (
              <div className="info-section">
                <label>Last Updated</label>
                <p>{formatDate(task.updatedAt)}</p>
              </div>
            )}
          </div>

          {/* Delete Button */}
          <div className="drawer-actions">
            <button
              className="btn-delete-task"
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this task?')) {
                  onDelete(task._id)
                  onClose()
                }
              }}
            >
              Delete Task
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default TaskDrawer
