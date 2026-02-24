require('dotenv').config();
const path = require('path');
const fs = require('fs');

const app = require('./app');
const logger = require('../config/logger');

const configPath = path.join(__dirname, '..', 'config', 'default.json');
const defaults = fs.existsSync(configPath) ? require(configPath) : {};
const port = parseInt(process.env.PORT || defaults.port, 10) || 3000;

const server = app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});

module.exports = server;
