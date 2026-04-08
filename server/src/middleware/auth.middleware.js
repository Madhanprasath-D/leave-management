const { verifyToken } = require("../utils/jwt");

exports.authMiddleware = (req, res, next) => {
  const access = {
    "manager": ['/users/' , '/leaves', '/leaves/:id', '/meta'],
    "employee": ['/users/:id', '/leaves/apply', '/leaves', '/leaves/:id', '/leaves/apply/:id', '/meta']
  }
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Format: "Bearer <token>"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    // Verify token
    const decoded = verifyToken(token);

    console.log("--- decode", decoded, req.route.path);
    if (!access[decoded.role].includes(req.route.path)){
       throw new Error("Unauthorized");
    }

    req.user = decoded;
    
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};