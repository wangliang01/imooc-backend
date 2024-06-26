// module.exports = function (ctx) {
//   ctx.body =  {
//     name: 'user',
//     path: '/user',
//     meta: {
//       title: '用户中心!!!'
//     }
//   }
// }

class UserController {
  constructor() {}
  async index(ctx) {
    ctx.body = {
      name: 'user',
      path: '/user',
      meta: {
        title: '用户中心!!!!!'
      }
    }
  }
}

export default new UserController()