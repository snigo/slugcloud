exports.badRequest = (ctx) => {
  ctx.status = 400;
  return undefined;
};

exports.badCredentials = (ctx) => {
  ctx.status = 401;
  return { error: 'Invalid credentials.' };
};
