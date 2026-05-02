const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const app = express();

connectDb();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/project", require("./routes/projectRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port,()=>{
   console.log(`Server running on port ${port}`);
});