const express = require('express');
const app = express();
const cron = require('node-cron');
const router = require('./routers/index');
const { errorMiddleware } = require('./middleware/error-handler');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./workspace-management-swagger.json');
const { setNotificationTemplate } = require('./services/notification');

app.use(express.json());
app.use('/api/v1/', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorMiddleware);

cron.schedule('* * * * *', function () {
  setNotificationTemplate();
});
// throw error 404 for pages that do not exist
app.all('*', (_req, res) => {
  return res.sendStatus(404);
});
module.exports = app;
