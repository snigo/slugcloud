const { Router } = require('express');
const { signupMW, authMW } = require('../auth');
const { getByUser } = require('../model/slug');

const userRouter = Router();

userRouter.post('/signup', signupMW, (_, res) => {
  const { pid, cid, token } = res.user;
  res.status(200).json({ pid, cid, token });
});

userRouter.get('/slugs', authMW, async (req, res) => {
  try {
    const slugs = await getByUser(res.user.pid);
    res.status(200).json({ data: slugs });
  } catch (err) {
    res.status(500).json({ message: err });
  }
  return undefined;
});

module.exports = userRouter;
