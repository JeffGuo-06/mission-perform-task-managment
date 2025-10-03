🔧 Assignment: Build a Task Management Application

 

🎯 Objective

Create a simple task management web application that allows users to perform full CRUD (Create, Read, Update, Delete) operations on tasks. The application should include a clean, responsive UI, a functional backend, and persistent data storage.

 

📚 Requirements

1. Backend (Node.js, Express.js, MongoDB preferred)

Build a RESTful API with the following endpoints:
POST /tasks: Create a new task
GET /tasks: Retrieve all tasks
GET /tasks/:id: Retrieve a task by ID
PUT /tasks/:id: Update a task by ID
DELETE /tasks/:id: Delete a task by ID
Each task should include:
title (string, required)
description (string, optional)
status (e.g., “To Do”, “In Progress”, “Done”)
createdAt (timestamp)
Include basic error handling and use environment variables for config (MongoDB URI, port, etc.).
 

✅ Flexibility Option: You may use any database you're comfortable with (e.g., PostgreSQL, Firebase, etc.), but MongoDB is the preferred option and should be noted in your submission if an alternative is used.

 

2. Frontend (React)

Build a single-page application (SPA) that includes:
A form to add new tasks
A task list displaying task details (title, description, status, createdAt)
Buttons to edit and delete each task
A way to update status (e.g., dropdown or toggle)
Use React Hooks (useState, useEffect, etc.) for state and API calls
Style using CSS, Tailwind, or Bootstrap to ensure responsiveness and visual appeal
 

3. Integration

Connect the React frontend to the Express backend using Axios or fetch
Ensure real-time updates to the UI after any CRUD operation
 

4. Bonus Features (Optional)

Add user authentication (e.g., JWT-based login/logout)
Implement sorting or filtering by status, date, etc.
Deploy the app on Heroku, Vercel, or Netlify and provide a live URL
 

🎥 Alternative Submission Options

 

To make this assignment more accessible:

Screen Recording:
If your project is incomplete or you're facing issues, submit a short screen recording (e.g., Loom, Zoom recording) walking us through:
Your approach
Code structure
Challenges faced
What would you improve or add next
This will help demonstrate your thinking process and problem-solving, even if you couldn’t fully complete the app.
 
📦 Deliverables (Due: Friday, October 3rd, 2025 at 5:00 p.m. or earlier)

 

Please submit a GitHub repository via email containing:

Separate frontend/ and backend/ folders
A README.md with setup instructions (npm install, MongoDB setup or DB of choice, env variables, etc.)
A brief project explanation of your development process, key decisions, and challenges faced (in README.md or video) 
 
 

🧪 Evaluation Criteria

Code Quality: Clean, structured, and well-commented
Functionality: All CRUD actions working correctly
Stack Usage: Effective implementation of MERN (or stated alternative)
Problem-Solving: How well errors and edge cases are handled
UI/UX: Basic usability, responsiveness, and visual design
Documentation: Clear and easy-to-follow instructions
 

🕒 Time Expectation

Junior: 8–12 hours
Intermediate: 6–8 hours
AI-assisted: ~2 hours