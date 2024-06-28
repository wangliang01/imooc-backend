// const combineRouters = require('koa-combine-routers');

// const user = require('./user');

// module.exports = combineRouters(
//   user
// );

import combineRouters from "koa-combine-routers";

import user from "./user";
import captcha from "./captcha";

export default combineRouters(user, captcha);
