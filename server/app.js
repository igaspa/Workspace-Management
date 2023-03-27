const express = require('express');
const app = express();
const { errorMiddleware } = require('./middleware/error-handlers');

app.use(express.json());
app.use(errorMiddleware);

// throw error 404 for pages that do not exist
app.all('*', (_req, res) => {
  return res.sendStatus(404);
});

module.exports = app;
