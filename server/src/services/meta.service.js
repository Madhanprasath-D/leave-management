const leaveRepo = require("../repositories/leave.repository");

exports.getMeta = async (user) => {
  if (user.role === "employee") {
    return await leaveRepo.getUserMeta(user.id);
  } else {
    return await leaveRepo.getManagerMeta();
  }
};