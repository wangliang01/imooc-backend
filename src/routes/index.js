const combineRouters = require('koa-combine-routers');

const user = require('./user');

module.exports = combineRouters(
  user
);
