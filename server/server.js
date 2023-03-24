const app = require('./app');

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server listening on the port  ${port}`);
});
