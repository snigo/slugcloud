const fetch = require('isomorphic-unfetch');

const authPath = process.env.AUTH_PATH.replace(/\/$/, '');

exports.post = async (endpoint, data) => {
  const response = await fetch(`${authPath}/${endpoint}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const parsed = await response.json();
  return parsed;
};
