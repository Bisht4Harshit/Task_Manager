const express = require("express");
const router = express.Router();
const {createProject, getProjects, getProject} = require("../controllers/projectController");
const validateToken = require("../middleware/validateTokenHandler");
const adminOnly = require("../middleware/adminMiddleware");

router.use(validateToken);

router.route("/").get(getProjects);

// router.route("/").post(createProject);

router.route("/:id").get(getProject);

router.route("/").post( adminOnly, createProject);

module.exports = router;