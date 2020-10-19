const { DataTypes } = require('sequelize');
const db = require('.');

const User = db.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Secret = db.define('Secret', {
  cid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  secret: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Secret.belongsTo(User);
User.hasMany(Secret);

exports.createUser = async ({
  email,
  password,
  pid,
  cid,
  secret,
}) => {
  let user = await User.findOne({ where: { email } });
  if (user) return { error: 'User already exists.' };
  user = await User.create({ email, password, pid });
  const secretEntry = await Secret.create({ cid, secret });
  await secretEntry.setUser(user.id);
  return { pid, cid, secret };
};

exports.getUserByEmail = async (email) => {
  const user = User.findOne({ where: { email } });
  return user || null;
};

exports.getUser = async ({ pid, cid }) => {
  const user = await User.findOne({
    where: { pid },
    include: {
      model: Secret,
      where: { cid },
    },
  });
  if (!user || !user.Secrets.length) return null;

  return { pid: user.pid, cid: user.Secrets[0].cid, secret: user.Secrets[0].secret };
};

exports.createSecret = async ({ cid, secret, userId }) => {
  try {
    const secretEntry = await Secret.create({ cid, secret });
    await secretEntry.setUser(userId);
    return { secret: secretEntry.secret, cid: secretEntry.cid };
  } catch (err) {
    return { error: err };
  }
};
