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

exports.createUser = async ({ email, password, pid, cid, secret }) => {
  let user = await User.findOne({ where: { email } });
  if (user) return null;
  user = await User.create({ email, password, pid });
  const __secret = await Secret.create({ cid, secret });
  await __secret.setUser(user.id);
  return { pid, cid, secret };
};
