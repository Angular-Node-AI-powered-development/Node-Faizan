const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const errorHandler = require('./middleware/errorHandler');
const healthRoutes = require('./modules/health/health.routes');

const app = express();

const configPath = path.join(__dirname, '..', 'config', 'default.json');
const defaults = fs.existsSync(configPath) ? require(configPath) : {};

app.use(express.json());
app.use(morgan('combined'));

app.use('/api/health', healthRoutes);

app.use(errorHandler);

module.exports = app;
