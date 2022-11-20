const express           = require('express')
const router            = express.Router();
const authRouter        = require('./api/auth.js')
const tasksRouter       = require('./api/tasks.js')
const labelsRouter      = require('./api/label.js')
const usersRouter       = require('./api/user.js')
const registerRouter    = require("./web/register.js")
const loginRouter       = require('./web/login.js');
const dashboardRouter   = require("./web/dashboard")
const profileRouter     = require("./web/profile")

// api
router.use("/api/auth",         authRouter);
router.use("/api/tasks",        tasksRouter);
router.use("/api/labels",       labelsRouter);
router.use("/api/users",        usersRouter);


// web
router.use("/",                 dashboardRouter);
router.use("/register",         registerRouter);
router.use("/login",            loginRouter);
router.use("/profile",          profileRouter);
module.exports = router;
