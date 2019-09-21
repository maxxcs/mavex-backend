const mongoose = require('../config/database');

const ProjectSchema = new mongoose.Schema({

});

const ProjectModel = mongoose.model('Project', ProjectSchema);

export default ProjectModel;
