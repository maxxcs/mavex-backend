const router = require('express').Router();

//Home

router.get('/', (req, res) => {
  require('../controllers/home-controller').index(req, res);
});
router.post('/login', (req, res) => {
  require('../controllers/home-controller').login(req, res);
});
router.post('/register', (req, res) => {
  require('../controllers/home-controller').register(req, res);
});
router.get('/logout', (req, res) => {
  require('../controllers/home-controller').logout(req, res);
});

//Dashboard

router.get('/dashboard', (req, res) => {
  require('../controllers/dashboard-controller').index(req, res);
});
router.post('/dashboard/create-project', (req, res) => {
  require('../controllers/dashboard-controller').createProject(req, res);
});
router.put('/dashboard/config-project', (req, res) => {
  require('../controllers/dashboard-controller').configProject(req, res);
});
router.delete('/dashboard/remove-project', (req, res) => {
  require('../controllers/dashboard-controller').removeProject(req, res);
});
router.get('/dashboard/search', (req, res) => {
  require('../controllers/dashboard-controller').search(req, res);
});
router.get('/dashboard/user', (req, res) => {
  require('../controllers/dashboard-controller').userSettings(req, res);
});
router.post('/dashboard/user', (req, res) => {
  require('../controllers/dashboard-controller').userSubmitSettings(req, res);
});

//Projects

router.get('/workspace/:projectId', (req, res) => {
  require('../controllers/project-controller').workspace(req, res);
});
router.get('/workspace/:projectId/file/:fileId', (req, res) => {
  require('../controllers/project-controller').file(req, res);
});
router.get('/channels/:projectId', (req, res) => {
  require('../controllers/project-controller').channels(req, res);
});
router.get('/channels/:projectId/ch/:channelId', (req, res) => {
  require('../controllers/project-controller').channel(req, res);
});
router.get('/terminals/:projectId', (req, res) => {
  require('../controllers/project-controller').terminals(req, res);
});
router.get('/terminals/:projectId/mvx/:terminalId', (req, res) => {
  require('../controllers/project-controller').terminal(req, res);
});

module.exports = app => app.use('/api', router);
