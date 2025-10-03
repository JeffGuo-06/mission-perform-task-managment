# Task Management Application

A full-stack MERN application for managing tasks with CRUD operations.

🚀 **[Live Demo](https://task-manager-frontend-ten-zeta.vercel.app/)**

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn

### Quick Start

1. Navigate to the task-manager directory:
```bash
cd task-manager
```

2. Install dependencies for both frontend and backend:
```bash
npm install
```

3. Create a `.env` file in the `task-manager/backend` folder with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5001
```

4. Start both frontend and backend servers:
```bash
npm run dev
```

The backend will run on `http://localhost:5001` and the frontend on `http://localhost:3000`

### Individual Setup (Alternative)

If you prefer to run frontend and backend separately:

**Backend:**
```bash
cd task-manager/backend
npm install
npm run dev
```

**Frontend:**
```bash
cd task-manager/frontend
npm install
npm run dev
```

### Environment Variables

**Backend (.env):**
- `MONGODB_URI`: MongoDB connection string
- `PORT`: Server port (default: 5001)

## Deployment to Vercel

This project is configured for deployment on Vercel. You'll need to deploy the frontend and backend separately.

### Deploy Backend (API)

1. Navigate to the backend directory:
```bash
cd task-manager/backend
```

2. Deploy to Vercel:
```bash
vercel
```

3. Add environment variables in Vercel dashboard:
   - Go to your backend project settings on Vercel
   - Navigate to Environment Variables
   - Add:
     - `MONGODB_URI`: Your MongoDB connection string
     - `PORT`: 5001

4. Copy the deployment URL (e.g., `https://your-backend.vercel.app`)

### Deploy Frontend

1. Navigate to the frontend directory:
```bash
cd task-manager/frontend
```

2. Update `vite.config.js` to point to your deployed backend:
```javascript
proxy: {
  '/api': {
    target: 'https://your-backend.vercel.app',
    changeOrigin: true
  }
}
```

3. Deploy to Vercel:
```bash
vercel
```

4. Your app is now live!

### Alternative: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and create two new projects:
   - **Backend**: Set root directory to `task-manager/backend`
   - **Frontend**: Set root directory to `task-manager/frontend`
3. Add environment variables in each project's settings
4. Update frontend's `vite.config.js` with the backend URL

## Project Structure

```
├── task-manager/
│   ├── backend/
│   │   ├── server.js
│   │   ├── package.json
│   │   ├── vercel.json
│   │   └── .env
│   └── frontend/
│       ├── src/
│       ├── package.json
│       └── vite.config.js
```

## Development Process

### Learning Phase
The first step I took was to learn MongoDB, since that was the one part of the stack that I was least familiar with. After setting up Mongo, I began developing the frontend and backend, trying to make the experience as smooth as possible to differentiate from a typical task manager.

### Key Design Decisions

**Task Drawer Implementation**
I implemented a task drawer that displays as a side drawer on desktop and a bottom sheet on mobile. This design choice was made for two key reasons:

1. **Content Management**: If someone added a very long description, it would add clutter to the main task page and create large gaps between tasks. To solve this, I limited the description display to 3 lines maximum on the main page.

2. **User Experience**: I evaluated three options - opening a new page, using a modal, or implementing a drawer. The drawer provided the cleanest solution because:
   - Users can still see their task list while viewing details
   - It works seamlessly on both desktop and mobile devices
   - It provides a smooth, modern user experience

### Challenges Faced
- Learning MongoDB Atlas and integrating it with the MERN stack
- Deploying serverless functions on Vercel with proper MongoDB connection handling
- Implementing responsive design patterns that work across desktop and mobile devices
