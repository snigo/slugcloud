const { post } = require('./fetch');
const { sign, verify } = require('./jwt');

exports.signupMW = async (req, res, next) => {
  const pid = req.cookies.pid || req.headers['x-consumer-id'];
  const { email, password } = req.body;
  res.user = await post('signup', { email, password, pid });
  res.user.token = sign(pid, res.user.secret);
  next();
};

exports.authMW = async (req, res, next) => {
  const pid = req.cookies.pid || req.headers['x-consumer-id'];
  const cid = req.cookies.cid || req.headers['x-client-id'];
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.split(/\s+/)[1] : null;
  if (!pid || !cid || !token) return res.sendStatus(401);
  const user = await post('auth', { cid, pid });
  try {
    const result = await verify(token, pid, user.secret);
    if (!result) return res.sendStatus(401);
  } catch (_) {
    res.sendStatus(401);
  }
  res.user = { cid, pid, token };
  return next();
};
