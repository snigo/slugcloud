const { Router } = require('express');
const { createSlug } = require('../model/slug');

const apiRouter = Router();

apiRouter.post('/slugs', async (req, res) => {
  try {
    const slug = await createSlug(req.body);
    res.status(200).json(slug);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = apiRouter;
