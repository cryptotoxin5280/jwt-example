'use strict';
const Users = require('../models/users');
const {SHA3} = require('sha3');
const hash = new SHA3(512);
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};
exports.authenticateToken = authenticateToken;

const authenticateUser = async (username, password) => {
  hash.reset();
  const passwordHash = hash.update(password);
  const hex = passwordHash.digest('hex');
  // console.log(`Password Hash: ${hex}`);
  const user = await Users.findOne({
    username: username,
    password: hex
  });
  if(!user) {  
    return false;
  }
  else {
    return true;
  }
};
exports.authenticateUser = authenticateUser;

const generateAccessToken = (username) => {
  return jwt.sign(
    {
      username: username
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.TOKEN_EXPIRATION
    }
  );
};
exports.generateAccessToken = generateAccessToken;

const generateRefreshToken = (username) => {
  return jwt.sign(
    {
      username: username
    },
    process.env.REFRESH_TOKEN_SECRET
  );
};
exports.generateRefreshToken = generateRefreshToken;
