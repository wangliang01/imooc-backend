import combineRouters from 'koa-combine-routers'
import Router from 'koa-router'
import path from 'path'
// import requireContext from 'require-context'
// import requireDirectory from 'require-directory'
import loginRouter from './login'
import publicRouter from './public'
import ContentRouter from './content'
import UserRouter from './user'

const requireContext = require('require-context')
const requireDirectory = require('require-directory')

// const currentModule = module
// const routers = [loginRouter, publicRouter, ContentRouter, UserRouter]

const routePath = path.join(process.cwd(), 'src/router')
const routerContext = requireContext(routePath, true, /\.js$/, {
  map: (moduleName) => {
    console.log('🚀 ~ moduleName:', moduleName)
    if (moduleName.includes('es6')) {
      return true
    }

    return false
  }
})

const routers = routerContext.keys().reduce((_routers, key) => {
  const router = routerContext(key).default
  if (router instanceof Router) {
    _routers.push(router)
  }
  return _routers
}, [])

console.log('routers', routers)

// requireDirectory(currentModule, routePath, {
//   visit: (obj) => {
//     const router = obj.default
//     if (router instanceof Router) {
//       routers.push(router)
//     }
//   }
// })

export default combineRouters(...routers)
