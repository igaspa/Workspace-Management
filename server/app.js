const express = require('express');
const app = express();
const router = require('./routers/index');
const { errorMiddleware } = require('./middleware/error-handler');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./workspace-management-swagger.json');

app.use(express.json());
app.use('/api/v1/', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorMiddleware);


// throw error 404 for pages that do not exist
app.all('*', (_req, res) => {
  return res.sendStatus(404);
});
module.exports = app;
