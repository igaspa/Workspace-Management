const express = require('express');
const app = express();
const router = require('./routers/index');
const { errorMiddleware } = require('./middleware/error-handler');

app.use(express.json());
app.use(errorMiddleware);
app.use('/api/v1/', router);

// throw error 404 for pages that do not exist
app.all('*', (_req, res) => {
  return res.sendStatus(404);
});

module.exports = app;
