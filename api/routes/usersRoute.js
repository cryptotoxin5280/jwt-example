'use strict';
const express = require('express');
const User = require('../models/users');
const usersRouter = express.Router();
const Joi = require('joi');
const {authenticateToken} = require('../components/auth');

const validateUser = (user) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  });
  return schema.validate(user);
};

usersRouter.post('/api/v1/users', authenticateToken, async (req, res) => {
  const {error} = validateUser(req.body);
  if(error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
  return;
});

usersRouter.get('/api/v1/users', authenticateToken, async (req, res) => {
  const user = await User.find();
  if (!user) {
    res.status(404).send('No users found!');
  }
  res.status(200).json(user);  
  return;
});

usersRouter.get('/api/v1/users/:userId', authenticateToken, 
  async (req, res) => {
    const user = User.findOne({
      _id: req.params.UserId
    });
    if (!user){
      res.status(404).send(`User '${req.params.userId}' not found!`);
      return;
    }
    res.status(200).json(user);
    return;
  }
);

usersRouter.put('/api/v1/users/:userId', authenticateToken,
  async (req, res) => {
    const user = await User.findOneAndUpdate(
      {
      _id: req.params.UserId
      },
      req.body
    );
    if (!user) {
      res.status(404).send(`User '${req.params.userId}' not found!`);
      return;
    }
    res.status(200).json(user);
    return;
  }
);

usersRouter.delete('api/v1/users', authenticateToken, async (req, res) => {
  const user = await User.deleteMany({});
  res.status(200).send(user);
  return;
});

usersRouter.delete('/api/v1/users/:UserId', authenticateToken,
  async (req, res) => {
    const user = await User.findOneAndDelete({
      _id: req.params.UserId
    });
    if (!user) {
      res.status(404).send(`User '${req.params.userId}' not found!`);
      return;
    }
    User.delete();
    res.status(200).send(`User '${req.params.userId}' deleted!`);
    return;
  }
);

module.exports = usersRouter;
