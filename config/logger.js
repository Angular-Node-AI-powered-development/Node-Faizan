const winston = require('winston');
const path = require('path');
const fs = require('fs');

const configPath = path.join(__dirname, 'default.json');
const defaults = fs.existsSync(configPath) ? require(configPath) : {};
const logLevel = process.env.LOG_LEVEL || (defaults.logLevel || 'info');
const logsDir = defaults.logs?.dir || 'logs';
const filename = defaults.logs?.filename || 'app.log';
const logDirPath = path.isAbsolute(logsDir) ? logsDir : path.join(__dirname, '..', logsDir);

if (!fs.existsSync(logDirPath)) {
  fs.mkdirSync(logDirPath, { recursive: true });
}

const logger = winston.createLogger({
  level: logLevel,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'node-faizan' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: path.join(logDirPath, filename),
    }),
  ],
});

module.exports = logger;
