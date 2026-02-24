const healthService = require('./health.service');
const { success } = require('../../utils/httpResponse');

async function getHealth(req, res, next) {
  try {
    const data = healthService.getStatus();
    return success(res, data);
  } catch (err) {
    next(err);
  }
}

module.exports = { getHealth };
