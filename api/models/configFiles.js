const mongoose = require('mongoose');

const configFilesSchema = new mongoose.Schema(
    {
        customer: {type: String},
	name: {type: String},
	filename: {type: String}
    }
);
module.exports = mongoose.model('Configs', configsSchema, 'configs');
