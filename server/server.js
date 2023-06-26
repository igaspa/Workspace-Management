const app = require('./app');
const cron = require("node-cron");
const { setNotificationTemplate } = require('./services/notification');

const PORT = process.env.PORT || 4000;

cron.schedule("0 * * * *",function (){
  setNotificationTemplate();
})

app.listen(PORT, () => {
  console.log(`Server listening on the port  ${PORT}`);
  setNotificationTemplate();
});
