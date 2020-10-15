const { Router } = require('express');
const { getUrl } = require('../model/slug');

const slugRouter = Router();

slugRouter.get('/:slug', async (req, res) => {
  try {
    const url = await getUrl(req.params.slug);
    if (!url) return res.status(404);
    res.redirect(url);
  } catch (err) {
    res.status(500).json({ message: err });
  }
  return undefined;
});

module.exports = slugRouter;
