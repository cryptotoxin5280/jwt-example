'use string';
const express = require('express');
const docsRouter = express.Router();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

/**
 * API DOCS
 */
const apiSpec = YAML.load('./api-specs/openapi-spec-autonomy.yml');
docsRouter.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiSpec));

module.exports = docsRouter;
