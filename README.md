# Team Task Manager (Full-Stack)

A role-based task management web application where Admins can manage projects and assign tasks, and Members can track and update their tasks.


## Features

### Authentication & Authorization
- User registration & login (JWT-based)
- Role-based access control (Admin / Member)

### Project Management

**Admin can:**
- Create projects
- Assign team members to projects
- Create and assign tasks

**Members can:**
- View assigned tasks
- Update task status (todo → in-progress → done)


## Tech Stack

### Frontend
- React (Vite)
- Fetch API / Axios
- LocalStorage (JWT handling)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

### Deployment
- Railway (Backend + Frontend)
- MongoDB Atlas (Database)


## Project Structure


Team_Task_Manager/

├── backend/
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ └── index.js

├── frontend/
│ ├── src/
│ ├── components/
│ ├── pages/
│ └── api/

└── README.md



## Environment Variables

### Backend (.env)

PORT=5001
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_secret_key


### Frontend (.env)

VITE_API_URL=https://your-backend-url.up.railway.app



## API Endpoints

### Auth
- POST /api/users/register
- POST /api/users/login
- GET /api/users/current

### Projects
- POST /api/project
- GET /api/project
- GET /api/project/:id

### Tasks
- POST /api/tasks
- GET /api/tasks
- GET /api/tasks/:id
- PUT /api/tasks/:id
- DELETE /api/tasks/:id


## Author

Harshit Bisht
