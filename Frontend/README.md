# Team Task Manager Frontend

React frontend for the Team Task Manager placement assignment.

## Features

- Signup and login screens
- Admin and Member role-aware interface
- Dashboard with project count, total tasks, in-progress tasks, and done tasks
- Project creation and project listing using the backend project schema
- Task creation, member dropdown assignment, and status tracking
- Team member/profile view

## Tech Stack

- React
- Vite
- CSS
- lucide-react icons

## Setup

```bash
npm install
npm run dev
```

Create a `.env` file:

```env
VITE_API_URL=/api
```

The included `vite.config.js` proxies `/api` to `http://localhost:5000`, which matches the Express backend's default port.

## Backend Routes Used

The frontend is wired to the current backend repo:

```txt
POST /api/users/register
POST /api/users/login
GET  /api/users/current
GET  /api/users
GET  /api/project
POST /api/project
GET  /api/tasks
POST /api/tasks
PUT  /api/tasks/:id
```

Login should return:

```json
{
  "accessToken": "jwt-token",
  "userId": "user-id",
  "role": "admin"
}
```

After login, the frontend calls `GET /api/users/current` to load username, email, id, and role from the token.

## Backend Notes

The task assignment dropdown needs the backend to expose `GET /api/users` for admins. It should return users without passwords:

```js
// controllers/userController.js
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}, "username email role createdAt").sort({ username: 1 });
  res.status(200).json(users);
});

module.exports = { registerUser, loginUser, currentUser, getUsers };
```

```js
// routes/userRoutes.js
const { registerUser, currentUser, loginUser, getUsers } = require("../controllers/userController");
const adminOnly = require("../middleware/adminMiddleware");

router.get("/", validateToken, adminOnly, getUsers);
```

If you deploy the frontend separately from the backend, set `VITE_API_URL` to the full backend API URL, for example:

```env
VITE_API_URL=https://your-backend.example.com/api
```

## Build

```bash
npm run build
```

The production build is generated in `dist/`.

## Deployment

For Railway:

- Set the build command to `npm run build`
- Set the start command to `npm run preview -- --host 0.0.0.0 --port $PORT`
- Add `VITE_API_URL` with your deployed backend API URL
