const express = require("express");
const router = express.Router();

// Controllers
const { login, signup } = require("../controllers/auth.controller");
const { getUsers } = require("../controllers/user.controller");
const {
  getLeaves,
  applyLeave,
  updateLeave,
} = require("../controllers/leave.controller");
const { getMeta } = require("../controllers/meta.controller");

// Middleware
const { authMiddleware } = require("../middleware/auth.middleware");

router.post("/auth/login", login);
router.post("/auth/signup", signup);

router.get("/users/:id?", authMiddleware, getUsers);

router.get("/leaves/:id?", authMiddleware, getLeaves);
router.post("/leaves", authMiddleware, applyLeave);
router.patch("/leaves/:id", authMiddleware, updateLeave);

router.get("/meta", authMiddleware, getMeta);

module.exports = router;