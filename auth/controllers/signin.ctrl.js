const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');
const { getUserByEmail, createSecret } = require('../model/user');
const { badRequest, badCredentials } = require('./handlers');

module.exports = async (ctx) => {
  const { email, password } = ctx.request.body;
  if (!email || !password) return badRequest(ctx);

  const user = await getUserByEmail(email);
  if (!user) return badCredentials(ctx);
  /**
   * Compare password
   */
  const authorized = await bcrypt.compare(password, user.password);
  if (!authorized) return badCredentials(ctx);

  /**
   * Generate cid and secret
   */
  const cid = uuid().replace(/-/g, '');
  const secret = uuid().replace(/-/g, '');

  const secretEntry = await createSecret({ userId: user.id, cid, secret });

  ctx.status = 200;
  ctx.body = { pid: user.pid, cid: secretEntry.cid, secret: secretEntry.secret };
  return undefined;
};
