const pool = require("../config/db");

// Employee metadata
exports.getUserMeta = async (userId) => {
  const result = await pool.query(
    `SELECT 
      COUNT(*) AS total,
      COUNT(*) FILTER (WHERE status='PENDING') AS pending,
      COUNT(*) FILTER (WHERE status='APPROVED') AS approved
     FROM leaves
     WHERE user_id = $1`,
    [userId]
  );

  return result.rows[0];
};

// Manager metadata
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