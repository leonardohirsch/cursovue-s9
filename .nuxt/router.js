import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _49f94401 = () => interopDefault(import('..\\pages\\admin\\index.vue' /* webpackChunkName: "pages/admin/index" */))
const _e70eb8b2 = () => interopDefault(import('..\\pages\\login\\index.vue' /* webpackChunkName: "pages/login/index" */))
const _07344fcc = () => interopDefault(import('..\\pages\\logout\\index.vue' /* webpackChunkName: "pages/logout/index" */))
const _8ea6223e = () => interopDefault(import('..\\pages\\register\\index.vue' /* webpackChunkName: "pages/register/index" */))
const _5b52842e = () => interopDefault(import('..\\pages\\user\\account\\index.vue' /* webpackChunkName: "pages/user/account/index" */))
const _402fcb32 = () => interopDefault(import('..\\pages\\user\\bestmovies\\index.vue' /* webpackChunkName: "pages/user/bestmovies/index" */))
const _4fa35956 = () => interopDefault(import('..\\pages\\user\\bloqueados\\index.vue' /* webpackChunkName: "pages/user/bloqueados/index" */))
const _ec26868c = () => interopDefault(import('..\\pages\\user\\home\\index.vue' /* webpackChunkName: "pages/user/home/index" */))
const _535f77ac = () => interopDefault(import('..\\pages\\user\\mymovies\\index.vue' /* webpackChunkName: "pages/user/mymovies/index" */))
const _2483d9a0 = () => interopDefault(import('..\\pages\\user\\mymovies\\_id\\index.vue' /* webpackChunkName: "pages/user/mymovies/_id/index" */))
const _8b4ac538 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _49f94401,
    name: "admin"
  }, {
    path: "/login",
    component: _e70eb8b2,
    name: "login"
  }, {
    path: "/logout",
    component: _07344fcc,
    name: "logout"
  }, {
    path: "/register",
    component: _8ea6223e,
    name: "register"
  }, {
    path: "/user/account",
    component: _5b52842e,
    name: "user-account"
  }, {
    path: "/user/bestmovies",
    component: _402fcb32,
    name: "user-bestmovies"
  }, {
    path: "/user/bloqueados",
    component: _4fa35956,
    name: "user-bloqueados"
  }, {
    path: "/user/home",
    component: _ec26868c,
    name: "user-home"
  }, {
    path: "/user/mymovies",
    component: _535f77ac,
    name: "user-mymovies"
  }, {
    path: "/user/mymovies/:id",
    component: _2483d9a0,
    name: "user-mymovies-id"
  }, {
    path: "/",
    component: _8b4ac538,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
