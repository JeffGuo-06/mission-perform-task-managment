import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import TaskDrawer from './components/TaskDrawer'
import API_URL from './config'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [editingTask, setEditingTask] = useState(null)
  const [selectedTask, setSelectedTask] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/tasks`)
      setTasks(response.data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  // Create task
  const createTask = async (taskData) => {
    try {
      await axios.post(`${API_URL}/api/tasks`, taskData)
      fetchTasks()
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  // Update task with optimistic update
  const updateTask = async (id, taskData) => {
    // Optimistic update: update UI immediately
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task._id === id ? { ...task, ...taskData } : task
      )
    )

    // Also update selectedTask if it's the one being updated
    if (selectedTask && selectedTask._id === id) {
      setSelectedTask(prev => ({ ...prev, ...taskData }))
    }

    try {
      await axios.put(`${API_URL}/api/tasks/${id}`, taskData)
      setEditingTask(null)
    } catch (error) {
      console.error('Error updating task:', error)
      // Revert on error by refetching
      fetchTasks()
    }
  }

  // Delete task with optimistic update
  const deleteTask = async (id) => {
    // Optimistic update: remove from UI immediately
    setTasks(prevTasks => prevTasks.filter(task => task._id !== id))

    try {
      await axios.delete(`${API_URL}/api/tasks/${id}`)
    } catch (error) {
      console.error('Error deleting task:', error)
      // Revert on error by refetching
      fetchTasks()
    }
  }

  // Open task in drawer
  const handleTaskClick = (task) => {
    setSelectedTask(task)
    setIsDrawerOpen(true)
  }

  // Close drawer
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
    setTimeout(() => setSelectedTask(null), 300) // Wait for animation
  }

  // Update task from drawer
  const handleDrawerUpdate = async (id, taskData) => {
    await updateTask(id, taskData)
    handleCloseDrawer()
  }

  return (
    <div className="app">
      <Header />
      <div className="container">
        <TaskForm
          onSubmit={createTask}
          editingTask={null}
          onCancel={() => {}}
        />
        <TaskList
          tasks={tasks}
          onTaskClick={handleTaskClick}
          onStatusChange={updateTask}
        />
      </div>

      <TaskDrawer
        task={selectedTask}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        onUpdate={handleDrawerUpdate}
        onDelete={deleteTask}
      />
    </div>
  )
}

export default App
