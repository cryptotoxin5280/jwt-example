const mongoose = require('mongoose');

const devicesSchema = new mongoose.Schema(
  {
    customer: {type: String, required: true},
    type: {type: String, required: true},
    serial_number: {type: String, unique: true, required: true},
    files: {type: Array, of: mongoose.Types.ObjectId, required: false}
  }
);
module.exports = mongoose.model('Device', devicesSchema, 'devices');
