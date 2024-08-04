import combineRouters from 'koa-combine-routers'
import Router from 'koa-router'
import path from 'path'
// import requireContext from 'require-context'
import requireDirectory from 'require-directory'
import loginRouter from './login'
import publicRouter from './public'

// const requireContext = require('require-context');
// const requireDirectory =  require('require-directory')

const currentModule = module
const routers = []

const routePath = path.join(process.cwd(), 'src/router')
// const routerContext = requireContext(routePath, true, /\.js$/)

// routerContext.keys().forEach(key => {
//   const router = routerContext(key).default
//   if (router instanceof Router) {
//     routers.push(router)
//   }
// })

requireDirectory(currentModule, routePath, {
  visit: (obj) => {
    const router = obj.default
    if (router instanceof Router) {
      routers.push(router)
    }
  }
})

export default combineRouters(...routers)
