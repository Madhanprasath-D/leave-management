// src/services/auth.service.js
const userRepo = require("../repositories/user.repository");
const { generateToken } = require("../utils/jwt");

exports.login = async (email, password) => {
  const user = await userRepo.findByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.password !== password) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken({ id: user.id, role: user.role });

  return {
    message: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      role: user.role,
    },
  };
};