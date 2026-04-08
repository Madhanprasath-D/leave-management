const userRepo = require("../repositories/user.repository");

exports.getUsers = async (id) => {
  if (id) {
    return await userRepo.getById(id);
  }
  return await userRepo.getAll();
};