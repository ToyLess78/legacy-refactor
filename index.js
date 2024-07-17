const { server } = require('ts-node').register({ project: './tsconfig.json' }) && require('./src/index');

module.exports = { server };
