const jwt = require('jsonwebtoken');

exports.sign = (pid, secret) => jwt.sign({ pid }, secret);

exports.verify = (token, pid, secret) => new Promise((res, rej) => {
  try {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) rej(err);
      else res(decoded.pid === pid);
    });
  } catch (err) {
    rej(err);
  }
});
