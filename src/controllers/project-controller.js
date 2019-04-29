module.exports.workspace = async (req, res) => {
  res.json({ controller: 'project', location: 'workspace' });
};

module.exports.file = async (req, res) => {
  res.json({ controller: 'project', location: 'file' });
};

module.exports.channels = async (req, res) => {
  res.json({ controller: 'project', location: 'channels' });
};

module.exports.channel = async (req, res) => {
  res.json({ controller: 'project', location: 'ch' });
};

module.exports.terminals = async (req, res) => {
  res.json({ controller: 'project', location: 'terminals' });
};

module.exports.terminal = async (req, res) => {
  res.json({ controller: 'project', location: 'terminal' });
};
