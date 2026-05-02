const express = require("express");
const router = express.Router();
const {getTasks, createTask, getTask, updateTask, deleteTask} = require("../controllers/taskController");
const adminOnly = require("../middleware/adminMiddleware");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);

router.route("/").get(getTasks);


router.route("/").post(adminOnly,  createTask);

router.route("/:id").get(getTask);

router.route("/:id").put(updateTask);

router.route("/:id").delete(adminOnly,  deleteTask);

module.exports = router;