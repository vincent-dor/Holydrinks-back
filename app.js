const cors = require('cors');
const express = require('express');
const connection = require('./db-config');
require('dotenv').config();

connection.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
  } else {
    console.log(`connected to database with threadId :  ${connection.threadId}`);
  }
});

const setupRoutes = require('./routers/routes');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

setupRoutes(app);

app.listen(port, () => {
  console.log(`Server run on ${port}`);
});

module.exports = app;