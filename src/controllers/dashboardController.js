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

module.exports.search = async (req, res) => {
    res.json({ controller: 'dashboard', location: 'search' });
};

module.exports.userSettings = async (req, res) => {
    res.json({ controller: 'dashboard', location: 'user-settings' });
};

module.exports.userSubmitSettings = async (req, res) => {
    res.json({ controller: 'dashboard', location: 'user-submit-settings' });
};
