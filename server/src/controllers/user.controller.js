const userService = require('../services/user.service')
exports.getUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await userService.getUsers(id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};