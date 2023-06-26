const app = require('./app');
const { setNotificationTemplate } = require('./services/notification');

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  console.log(`Server listening on the port  ${PORT}`);
  await setNotificationTemplate();
});
