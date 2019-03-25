const router = require('express').Router();

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

router.get('/workspace/p/:projectId', (req, res) => {
    require('../controllers/projectController').workspace(req, res);
});

router.get('/hub/p/:projectId', (req, res) => {
    require('../controllers/projectController').channels(req, res);
});

router.get('/xve/p/:projectId', (req, res) => {
    require('../controllers/projectController').xve(req, res);
});

module.exports = app => app.use('/api', router);
