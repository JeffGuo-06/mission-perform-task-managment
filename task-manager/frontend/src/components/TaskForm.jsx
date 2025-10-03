import { useState, useEffect } from 'react'
import { FiPlus } from 'react-icons/fi'
import StatusDropdown from './StatusDropdown'
import './TaskForm.css'

function TaskForm({ onSubmit, editingTask, onCancel }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'To Do'
  })

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description || '',
        status: editingTask.status
      })
    }
  }, [editingTask])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    if (editingTask) {
      onSubmit(editingTask._id, formData)
    } else {
      onSubmit(formData)
    }

    setFormData({
      title: '',
      description: '',
      status: 'To Do'
    })
    setIsExpanded(false)
  }

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      status: 'To Do'
    })
    setIsExpanded(false)
    onCancel()
  }

  const handleExpand = () => {
    setIsExpanded(true)
  }

  // Collapsed state - just a button
  if (!isExpanded) {
    return (
      <div className="task-form-collapsed">
        <button className="create-task-btn" onClick={handleExpand}>
          <FiPlus size={20} />
          <span>Create</span>
        </button>
      </div>
    )
  }

  // Expanded state - show full form
  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="title"
          placeholder="Task title *"
          value={formData.title}
          onChange={handleChange}
          required
          autoFocus
        />
      </div>
      <div className="form-group">
        <textarea
          name="description"
          placeholder="Task description (optional)"
          value={formData.description}
          onChange={handleChange}
          rows="3"
        />
      </div>
      <div className="form-group">
        <StatusDropdown
          value={formData.status}
          onChange={(newStatus) => setFormData({ ...formData, status: newStatus })}
          variant="form"
        />
      </div>
      <div className="form-actions">
        <button
          type="submit"
          className={`btn ${formData.title.trim() ? 'btn-primary' : 'btn-neutral'}`}
        >
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export default TaskForm
