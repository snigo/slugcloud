/* eslint-disable no-console */
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const authRouter = require('./routes');
const db = require('./model');

const { PORT } = process.env;

const app = new Koa();

app.use(bodyParser());

app.use(authRouter.routes());

(async () => {
  console.log('Connecting to database...');
  await db.sync();
  console.log('Successfully connected to database. Starting server...');
  app.listen(PORT, () => {
    console.log(`Server is up and listening on port ${PORT}.`);
  });
})();
