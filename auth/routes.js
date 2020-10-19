const Router = require('koa-router');
const { signupCtrl, signinCtrl, authCtrl } = require('./controllers');

const authRouter = new Router();

authRouter.post('/auth', authCtrl);
authRouter.post('/signin', signinCtrl);
authRouter.post('/signup', signupCtrl);

module.exports = authRouter;
