const leaveService = require("../services/leave.service");

exports.getLeaves = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
  
    const data = await leaveService.getLeaves(id, status);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.applyLeave = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await leaveService.applyLeave(userId, req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const { approve, comment } = req.body;

    const result = await leaveService.updateLeaveStatus(
      id,
      approve,
      comment,
      req.user.id
    );

    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.cancelLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const result = await leaveService.cancelLeave(id, userId);

    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};