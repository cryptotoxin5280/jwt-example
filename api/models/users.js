'use strict';
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const usersSchema = new mongoose.Schema(
  {
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
  }
);

usersSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', usersSchema, 'users');

