const { getUser } = require('../model/user');
const { badRequest, badCredentials } = require('./handlers');

module.exports = async (ctx) => {
  const { pid, cid } = ctx.request.body;
  if (!pid || !cid) return badRequest(ctx);

  const user = await getUser({ pid, cid });
  if (!user) return badCredentials(ctx);

  ctx.status = 200;
  ctx.body = user;
  return undefined;
};
