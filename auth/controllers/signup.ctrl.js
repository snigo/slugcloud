const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');
const { createUser } = require('../model/user');
const { badRequest } = require('./handlers');

const { SALT_ROUNDS } = process.env;

module.exports = async (ctx) => {
  const { email, password, pid } = ctx.request.body;
  if (!email || !password || !pid) return badRequest(ctx);

  /**
   * Hash password
   */
  const hash = await bcrypt.hash(password, +SALT_ROUNDS);

  /**
   * Generate cid and secret
   */
  const cid = uuid().replace(/-/g, '');
  const secret = uuid().replace(/-/g, '');

  const user = await createUser({
    email,
    password: hash,
    pid,
    cid,
    secret,
  });
  if (user.error) return badRequest(ctx);

  ctx.status = 200;
  ctx.body = user;
  return undefined;
};
