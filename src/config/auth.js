const jwt = require('jsonwebtoken');

const SECRET = 'mavex'; // Very secret, so much protection

function sign(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET, { algorithm: 'HS256' }, (err, token) => {
      if (err) return reject({ message: 'Something unexpected has occurred.' });
      return resolve(token);
    });
  });
}

function verify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET, { algorithm: 'HS256' }, (err, decoded) => {
      if (err) return reject({ message: 'Something unexpected has occurred.' });
      return resolve(decoded);
    });
  });
}

module.exports = { sign, verify };