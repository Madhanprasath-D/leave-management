const pool = require("../config/db");

exports.createLeave = async (data) => {
  const { user_id, leave_type, start_date, end_date, reason } = data;

  const result = await pool.query(
    `INSERT INTO leaves (user_id, leave_type, start_date, end_date, reason)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [user_id, leave_type, start_date, end_date, reason]
  );

  return result.rows[0];
};

exports.checkOverlap = async (user_id, start_date, end_date) => {
  const result = await pool.query(
    `SELECT * FROM leaves
     WHERE user_id = $1
     AND status IN ('PENDING', 'APPROVED')
     AND (start_date <= $3 AND end_date >= $2)`,
    [user_id, start_date, end_date]
  );

  return result.rows.length > 0;
};

exports.getLeaves = async (id, status) => {
  let query = `
    SELECT 
      l.*,
      u.name AS user_name,
      u.email AS user_email
    FROM leaves l
    JOIN users u ON l.user_id = u.id
    WHERE 1=1
  `;

  const params = [];

  if (id) {
    params.push(id);
    query += ` AND l.user_id = $${params.length}`;
  }

  if (status && status !== "all") {
    params.push(status.toUpperCase());
    query += ` AND l.status = $${params.length}`;
  }

  const result = await pool.query(query, params);
  return result.rows;
};

exports.updateStatus = async (id, status, comment) => {
  const result = await pool.query(
    `UPDATE leaves 
     SET status=$1, manager_comment=$2 
     WHERE id=$3 
     RETURNING *`,
    [status, comment, id]
  );

  return result.rows[0];
};


exports.getUserMeta = async (userId) => {
  const result = await pool.query(
    `SELECT 
      COUNT(*) AS total,
      COUNT(*) FILTER (WHERE status='PENDING') AS pending,
      COUNT(*) FILTER (WHERE status='APPROVED') AS approved
     FROM leaves WHERE user_id=$1`,
    [userId]
  );

  return result.rows[0];
};

exports.getManagerMeta = async () => {
  const result = await pool.query(
    `SELECT 
      COUNT(*) AS total,
      COUNT(*) FILTER (WHERE status='PENDING') AS pending,
      COUNT(*) FILTER (WHERE status='APPROVED') AS approved
     FROM leaves`
  );

  return result.rows[0];
};
