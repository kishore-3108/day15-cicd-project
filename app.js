const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Day-15 CI/CD Project Running! 🚀');
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});