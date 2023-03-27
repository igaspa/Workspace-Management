const express = require('express');
const app = express();
const { errorMiddleware } = require('./middleware/error-handlers');

app.use(express.json());

module.exports = app;
