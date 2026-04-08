
const metaService = require('../services/meta.service')
exports.getMeta = async (req, res) => {
  try {
    const data = await metaService.getMeta(req.user);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};