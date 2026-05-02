# Team Task Manager

Full-stack team task manager with an Express/MongoDB backend and React/Vite frontend.

## Project Structure

```txt
Backend/   Express API
Frontend/  React frontend
```

## Railway Deployment

Create two Railway services from the same GitHub repo.

### Backend Service

- Root directory: `Backend`
- Build command: `npm install`
- Start command: `npm start`
- Required variables:

```env
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret
CLIENT_URL=https://your-frontend-url.up.railway.app
```

Railway provides `PORT` automatically.

### Frontend Service

- Root directory: `Frontend`
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Required variables:

```env
VITE_API_URL=https://your-backend-url.up.railway.app/api
```

After changing `VITE_API_URL`, redeploy the frontend because Vite reads it during build time.
