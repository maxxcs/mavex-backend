const router = require('express').Router();

//Home

router.get('/', (req, res) => {
    require('../controllers/homeController').index(req, res);
});
router.post('/login', (req, res) => {
    require('../controllers/homeController').login(req, res);
});
router.post('/register', (req, res) => {
    require('../controllers/homeController').register(req, res);
});
router.get('/logout', (req, res) => {
    require('../controllers/homeController').logout(req, res);
});

//Dashboard

router.get('/dashboard', (req, res) => {
    require('../controllers/dashboardController').index(req, res);
});
router.post('/dashboard/create-project', (req, res) => {
    require('../controllers/dashboardController').createProject(req, res);
});
router.put('/dashboard/config-project', (req, res) => {
    require('../controllers/dashboardController').configProject(req, res);
});
router.delete('/dashboard/remove-project', (req, res) => {
    require('../controllers/dashboardController').removeProject(req, res);
});
router.get('/dashboard/search', (req, res) => {
    require('../controllers/dashboardController').search(req, res);
});
router.get('/dashboard/user', (req, res) => {
    require('../controllers/dashboardController').userSettings(req, res);
});
router.post('/dashboard/user', (req, res) => {
    require('../controllers/dashboardController').userSubmitSettings(req, res);
});

//Projects

router.get('/workspace/:projectId', (req, res) => {
    require('../controllers/projectController').workspace(req, res);
});
router.get('/workspace/:projectId/file/:fileId', (req, res) => {
    require('../controllers/projectController').file(req, res);
});
router.get('/channels/:projectId', (req, res) => {
    require('../controllers/projectController').channels(req, res);
});
router.get('/channels/:projectId/ch/:channelId', (req, res) => {
    require('../controllers/projectController').channel(req, res);
});
router.get('/xves/:projectId', (req, res) => {
    require('../controllers/projectController').xves(req, res);
});
router.get('/xves/:projectId/ve/:xveId', (req, res) => {
    require('../controllers/projectController').xve(req, res);
});

module.exports = app => app.use('/api', router);
