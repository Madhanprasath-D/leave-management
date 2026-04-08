const leaveRepo = require("../repositories/leave.repository");

exports.getLeaves = async (id, status) => {
  return await leaveRepo.getLeaves(id, status);
};

exports.applyLeave = async (userId, data) => {
  const { leave_type, start_date, end_date, reason } = data;

  const overlap = await leaveRepo.checkOverlap(
    userId,
    start_date,
    end_date
  );

  if (overlap) {
    throw new Error("Leave dates overlap");
  }

  return await leaveRepo.createLeave({
    user_id: userId,
    leave_type,
    start_date,
    end_date,
    reason,
  });
};

exports.updateLeaveStatus = async (leaveId, approve, comment, managerId) => {
  const status = approve ? "APPROVED" : "REJECTED";

  return await leaveRepo.updateStatus(leaveId, status, comment, managerId);
};


exports.cancelLeave = async (leaveId, userId) => {
  const leave = await leaveRepo.getLeaveById(leaveId);

  if (!leave) {
    throw new Error("Leave not found");
  }

  if (leave.user_id !== userId) {
    throw new Error("Unauthorized");
  }

  if (leave.status !== "PENDING") {
    throw new Error("Only pending leaves can be cancelled");
  }

  return await leaveRepo.deleteLeave(leaveId);
};