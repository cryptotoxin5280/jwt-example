'use strict';
const authRoute = require('./authRoute');
const devicesRoute = require('./devicesRoute');
const docsRoute = require('./docsRoute');
const configFilesRoute = require('./configFilesRoute');
const customersRoute = require('./customersRoute');
const usersRoute = require('./usersRoute');

const apiRoutes = [
  authRoute,
  configFilesRoute,
  customersRoute,
  devicesRoute,
  docsRoute,
  usersRoute
];
module.exports = apiRoutes;
