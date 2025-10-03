# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a MERN stack task management application built for a coding assignment. The project uses a monorepo structure with separate frontend and backend workspaces managed by npm workspaces.

## Project Structure

- `task-manager/` - Root monorepo directory
  - `backend/` - Express.js REST API with MongoDB
    - `models/Task.js` - Mongoose schema for tasks
    - `routes/tasks.js` - RESTful API endpoints
    - `server.js` - Express server setup
  - `frontend/` - React SPA built with Vite
    - `src/components/` - React components (TaskForm, TaskList, TaskItem)
    - `src/App.jsx` - Main application component with state management
    - `vite.config.js` - Vite configuration with proxy to backend

## Common Development Commands

### Initial Setup
```bash
# Install all dependencies (both frontend and backend)
npm run install:all
```

### Development
```bash
# Run both frontend and backend concurrently
npm run dev

# Run backend only (from root)
npm run dev:backend

# Run frontend only (from root)
npm run dev:frontend
```

### Backend Commands (from task-manager/backend/)
```bash
# Run backend in development mode with nodemon
npm run dev

# Run backend in production mode
npm start
```

### Frontend Commands (from task-manager/frontend/)
```bash
# Run frontend development server (port 3000)
npm run dev

# Build frontend for production
npm run build

# Preview production build
npm run preview
```

## Environment Configuration

### Backend (.env)
Required environment variables in `task-manager/backend/.env`:
- `MONGODB_URI` - MongoDB connection string (default: mongodb://localhost:27017/taskmanager)
- `PORT` - Backend server port (default: 5001)

See `backend/.env.example` for template.

### Frontend (.env)
Frontend uses Vite proxy configuration in `vite.config.js` to forward `/api` requests to backend at `http://localhost:5001`.

## Architecture Notes

### Backend API Structure
- RESTful API mounted at `/api/tasks`
- All task routes use async/await with try/catch error handling
- Tasks are sorted by `createdAt` in descending order by default
- Mongoose timestamps automatically add `createdAt` and `updatedAt` fields

### Frontend State Management
- App.jsx maintains global task state using useState
- All CRUD operations trigger `fetchTasks()` to refresh state
- Edit mode is handled through `editingTask` state - when set, TaskForm switches to update mode
- Status changes use the same `updateTask` function with partial data

### Task Model
Task schema includes:
- `title` (String, required)
- `description` (String, optional)
- `status` (Enum: "To Do", "In Progress", "Done")
- `createdAt` and `updatedAt` (automatic timestamps)

### API Endpoints
- `GET /api/tasks` - Retrieve all tasks
- `GET /api/tasks/:id` - Retrieve single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Development Notes

- Frontend runs on port 3000, backend on port 5001
- MongoDB must be running locally or provide remote connection string
- CORS is enabled on backend for cross-origin requests
- Vite provides HMR (Hot Module Replacement) for fast development
- Backend uses nodemon for automatic server restart on file changes
