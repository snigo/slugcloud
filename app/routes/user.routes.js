const { Router } = require('express');
const { getByUser } = require('../model/slug');

const userRouter = Router();

userRouter.get('/slugs', async (req, res) => {
  try {
    const pid = req.cookies.pid || req.headers['x-consumer-id'];
    const slugs = await getByUser(pid);
    if (!slugs || !pid) return res.status(401);
    res.status(200).json({ data: slugs });
  } catch (err) {
    res.status(500).json({ message: err });
  }
  return undefined;
});

module.exports = userRouter;
