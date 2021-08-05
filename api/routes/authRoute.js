'use strict';
const express = require('express');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');
const {
  authenticateUser,
  generateAccessToken,
  generateRefreshToken
} = require('../components/auth');

let refreshTokens = []; // TODO: Store tokens in MemCached

authRouter.post('/api/v1/auth/refreshToken', async (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) {
    return res.sendStatus(401);
  }
  if(refreshTokens.includes(refreshToken) == false) {
    console.error(`Refresh token not registered: ${refreshToken}`);
    return res.sendStatus(403);
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, 
    (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      const authToken = generateAccessToken({name: user.name});
      const refreshToken = generateRefreshToken({name: user.name});
      refreshTokens.filter(token => token !== req.body.token);
      refreshTokens.push(refreshToken);
      return res.status(200).json({
        authToken: authToken,
        refreshToken: refreshToken
      });
    });
});

authRouter.post('/api/v1/auth/login', async (req, res) => {
  const username = req.body.username
  const password = req.body.password
  try {
    // If user is authenticated...
    if (await authenticateUser(username, password)) {  
      // ...issue authentication token...
      const authToken = generateAccessToken(username);
      const refreshToken = generateRefreshToken(username);
      refreshTokens.push(refreshToken);
      return res.json({
        authToken: authToken,
        refreshToken: refreshToken
      });
    } else {
      // ...otherwise, username and/or password incorrect.
      return res.status(404).send(
        `Invalid username '${username}' or password!`);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

authRouter.delete('/api/v1/auth/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token);
  res.sendStatus(204);
});

module.exports = authRouter;
