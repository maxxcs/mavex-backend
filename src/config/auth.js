const jwt = require('jsonwebtoken');

const SECRET = 'E234ASER423S4E234S23E4S23D4F23S423R42T3432GF4D23H4T324D'; // Very secret, so much protection

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