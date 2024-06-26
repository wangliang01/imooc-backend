// const combineRouters = require('koa-combine-routers');

// const user = require('./user');

// module.exports = combineRouters(
//   user
// );

import combineRouters from "koa-combine-routers";

import user from "./user";

export default combineRouters(user);
