module.exports.index = async (req, res) => {
    res.json({ controller: 'dashboard', location: 'index' });
};

module.exports.createProject = async (req, res) => {
    res.json({ controller: 'dashboard', location: 'create-project' });
};

module.exports.configProject = async (req, res) => {
    res.json({ controller: 'dashboard', location: 'config-project' });
};

module.exports.removeProject = async (req, res) => {
    res.json({ controller: 'dashboard', location: 'remove-project' });
};
