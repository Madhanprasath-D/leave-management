const express = require("express");
const router = express.Router();

// Controllers
const { login, signup } = require("../controllers/auth.controler");
const { getUsers } = require("../controllers/user.controller");
const {
  getLeaves,
  applyLeave,
  updateLeave,
  cancelLeave
} = require("../controllers/leave.controller");
const { getMeta } = require("../controllers/meta.controller");

// Middleware
const { authMiddleware } = require("../middleware/auth.middleware");

router.post("/auth/login", login);
router.post("/auth/signup", signup);

router.get("/users", authMiddleware, getUsers);

router.get("/leaves", authMiddleware, getLeaves);
router.get("/leaves/:id", authMiddleware, getLeaves);

router.post("/leaves/apply", authMiddleware, applyLeave);
router.patch("/leaves/:id/update", authMiddleware, updateLeave);
router.delete("/leaves/:id/cancel", authMiddleware, cancelLeave);

router.get("/meta", authMiddleware, getMeta);

module.exports = router;