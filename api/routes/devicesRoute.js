'use strict';
const express = require('express');
const Joi = require('joi');
const Device = require('../models/devices');
const devicesRouter = express.Router()
const {authenticateToken} = require('../components/auth');

const validateDevice = (device) => {
  const schema = Joi.object({
    customer: Joi.string().required(),
    type: Joi.string().required(),
    serial_number: Joi.string().required()
  });
  return schema.validate(device);
};

devicesRouter.post('/api/v1/devices', authenticateToken, async (req, res) => {
  const {error} = validateDevice(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const device = new Device(req.body);
  await device.save();
  res.status(201).json(Device);
  return;
});

devicesRouter.get('/api/v1/devices', authenticateToken, async (req, res) => {
  const devices = await Device.find();
  if (!devices) {
    res.status(404).send('No devices found!');
  }
  res.status(200).json(devices);
  return;
});

devicesRouter.get('/api/v1/devices/:deviceId', 
  authenticateToken, async (req, res) => {
  const device = Device.findOne({
    _id: req.params.DeviceId
  });
  if (!device){
    res.status(404).send(`Device '${req.params.deviceId}' not found!`);
    return;
  }
  res.status(200).json(Device);
  return;
});

devicesRouter.put('/api/v1/devices/:deviceId',
  authenticateToken, async (req, res) => {
  const device = await Device.findOneAndUpdate(
    {
      _id: req.params.deviceId
    },
    req.body
  );
  if (!device) {
    res.status(404).send(`Device '${req.params.deviceId}' not found!`);
    return;
  }
  res.status(200).json(device);
  return;
});

devicesRouter.delete('api/v1/devices', authenticateToken, async (req, res) => {
  const devices = await Device.deleteMany({});
  res.status(200).send(devices);
  return;
});

devicesRouter.delete('/api/v1/devices/:deviceId', 
  authenticateToken, async (req, res) => {
  const device = await Device.findOneAndDelete({
    _id: req.params.deviceId
  });
  if (!device) {
    res.status(404).send(`Device '${req.params.deviceId}' not found!`);
    return;
  }
  device.delete();
  res.status(200).send(`Device '${req.params.deviceId}' deleted!`);
  return;
});

module.exports = devicesRouter;
