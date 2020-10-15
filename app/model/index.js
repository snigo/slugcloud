const { connect } = require('mongoose');

const { DB_CONNECTION_URL } = process.env;

module.exports = async () => {
  try {
    await connect(DB_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (err) {
    throw Error(err);
  }
};
