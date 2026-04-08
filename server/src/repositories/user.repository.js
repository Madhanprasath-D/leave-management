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
    `
    SELECT 
      u.id,
      u.name,
      u.email,
      u.role,
      u.created_at,

      -- availability flag
      CASE 
        WHEN EXISTS (
          SELECT 1 FROM leaves l
          WHERE l.user_id = u.id
          AND l.status = 'APPROVED'
          AND CURRENT_DATE BETWEEN l.start_date AND l.end_date
        )
        THEN false
        ELSE true
      END AS is_available

    FROM users u
    WHERE u.role = 'employee'
    ORDER BY u.created_at DESC
    `
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