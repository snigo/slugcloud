/* eslint-disable no-console */
const express = require('express');
const cookieParser = require('cookie-parser');
const { apiRouter, slugRouter, userRouter } = require('./routes');
const bootDb = require('./model');

const { PORT } = process.env;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/', slugRouter);
app.use('/api', apiRouter);
app.use('/user', userRouter);

(async () => {
  console.log('Connecting to database...');
  await bootDb();
  console.log('Successfully connected to database. Starting server...');
  app.listen(PORT, () => {
    console.log(`Server is up and listening on port ${PORT}.`);
  });
})();
