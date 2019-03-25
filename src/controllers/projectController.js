module.exports.workspace = async (req, res) => {
    res.json({ controller: 'project', location: 'workspace' });
};

module.exports.channels = async (req, res) => {
    res.json({ controller: 'project', location: 'channels' });
};

module.exports.xve = async (req, res) => {
    res.json({ controller: 'project', location: 'xve' });
};
