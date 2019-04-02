module.exports.index = async (req, res) => {
  res.json({ controller: 'home', location: 'index' });
};

module.exports.login = async (req, res) => {
  res.json({ controller: 'home', location: 'login' });
};

module.exports.register = async (req, res) => {
  res.json({ controller: 'home', location: 'register' });
};

module.exports.logout = async (req, res) => {
  res.json({ controller: 'home', location: 'logout' });
};
