'use string';
const express = require('express');
const configFilesRouter = express.Router();
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const fs = require('fs');
const multer = require('multer');
const {authenticateToken} = require('../components/auth');
const Device = require('../models/devices');

Grid.mongo = mongoose.mongo;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/tmp/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
    console.log(file.originalname);
  }
});

const upload = multer({storage: storage}).single('file');

configFilesRouter.post('/api/v1/devices/:deviceId/configFiles',
  authenticateToken, (req, res) => {
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        console.error(err);
        return res.status(500).send(err);
      }
      else if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      const gfs = Grid(mongoose.connection.db);
      const writestream = gfs.createWriteStream({
        filename: req.file.filename
      });
      fs.createReadStream(req.file.path).pipe(writestream);
      writestream.on('close', async (file) => {
        console.log(`Wrote ${file.filename} to DB.`);
        await Device.findOneAndUpdate(
          {
            _id: req.params.deviceId
          },
          {
            $push: {
              files: file._id
            }
          }
        );
        return res.status(201);
      });
    });
});

configFilesRouter.get('/api/v1/devices/:deviceId/configFiles',
  authenticateToken, async (req, res) => {
    const device = await Device.findOne({
      _id: req.params.deviceId
    });
    if (!device) {
      return res.status(404).send(
        `Device '${req.params.deviceId}' not found!`);
    }
    const gfs = Grid(mongoose.connection.db);
    gfs.files.find({
      _id: {
        $in: device.files
      }
    }).toArray((err, files) => {
      return res.status(200).json(files);
    });
});

configFilesRouter.get('/api/v1/configFiles/:fileId',
  authenticateToken, (req, res) => {
    const gfs = Grid(mongoose.connection.db);    
});

// configFilesRouter.delete('/api/v1/devices/:deviceId/configFiles',
//   authenticateToken, (req, res) => {
//     const gfs = Grid(mongoose.connection.db);
//     gfs.remove({}, () => {
//       if (error) {
//         return res.status(500);
//       }
//       return res.status(200);
//     });
// });

configFilesRouter.delete('/api/v1/configFiles/:fileId',
  authenticateToken, (req, res) => {
    const gfs = Grid(mongoose.connection.db);
    gfs.remove({
      _id: req.params.fileId
    }, (error) => {
      if (error) {
        return res.status(500);
      }
      return res.status(200);
    });
});

module.exports = configFilesRouter;
