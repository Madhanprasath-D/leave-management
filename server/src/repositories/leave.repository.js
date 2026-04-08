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
  let query = "SELECT * FROM leaves WHERE 1=1";
  const params = [];

  if (id) {
    params.push(id);
    query += ` AND user_id = $${params.length}`;
  }

  if (status && status !== "all") {
    params.push(status.toUpperCase());
    query += ` AND status = $${params.length}`;
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


/*

now i need create a apis 
1. for auth login -> post call have user email and password in body -> i need to aurt the user and need to send the user info and jwt
2. for auth sign up -> in post the user details like name, email, password in body assume the sign up use alway will be employee -> need to getthe data and encrept the password and store details it in db 
3. for leave request /:id?status=pending or all  if the api have id and query based on the id andquery the leave details want to be return
4. for user details -> /:id if id there the details for the spcific user or return all the user details
5. for apply leave -> get the details like leave type, from, to, reason from request body and add it in db with pending status.
6. for approve/reject -> get the detail like appeoves or not in bool, comment msg in body -> based on that change the status and comment msg in db
7. for metadata -> for user [total number of leave, total pending request, total approved request] want to return // for manager [total leave request,total  pending, total approved] want to return
*/