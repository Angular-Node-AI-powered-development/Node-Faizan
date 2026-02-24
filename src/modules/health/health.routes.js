const express = require('express');
const healthController = require('./health.controller');
const { healthValidators, validate } = require('./health.validation');

const router = express.Router();

router.get('/', validate(healthValidators.getHealth), healthController.getHealth);
router.get('/ping', validate(healthValidators.getHealth), healthController.getHealth);

module.exports = router;
