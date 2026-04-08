const pool = require("../config/db");

// Create user (signup)
exports.createUser = async ({ name, email, password, role }) => {
  const result = await pool.query(
    `INSERT INTO users (name, email, password, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, role`,
    [name, email, password, role]
  );

  return result.rows[0];
};

// Find by email (login)
exports.findByEmail = async (email) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );

  return result.rows[0];
};

// Get all users
exports.getAll = async () => {
  const result = await pool.query(
    `SELECT id, name, email, role, created_at FROM users WHERE role = 'employee' ORDER BY id DESC`
  );

  return result.rows;
};

// Get user by ID
exports.getById = async (id) => {
  const result = await pool.query(
    `SELECT id, name, email, role, created_at 
     FROM users WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};