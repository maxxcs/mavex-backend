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

module.exports.xves = async (req, res) => {
  res.json({ controller: 'project', location: 'xves' });
};

module.exports.xve = async (req, res) => {
  res.json({ controller: 'project', location: 've' });
};
