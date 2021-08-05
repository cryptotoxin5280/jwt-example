'use strict';
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const customersSchema = new mongoose.Schema(
  {
    name: {type: String, required: true, unique: true}
  }
);

customersSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Customer', customersSchema, 'customers');
