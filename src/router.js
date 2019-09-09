import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Netment from './components/netment'
import Datement from './components/datement'
import Building from './components/building'
import Progress from './components/progress'
import Management from './components/management'
import Dataimport from './components/dataimport'
import Visualization from './components/visualization'
import Version from './components/version'
import Guration from './components/guration'
import Login from './components/login'

import {
  Message
} from 'element-ui'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/login',
    name: 'login',
    component: Login,
  }, {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/netment',
    children: [{
      path: '/netment',
      name: 'netment',
      component: Netment
    }, {
      path: '/datement',
      name: 'datement',
      component: Datement
    }, {
      path: '/building',
      name: 'building',
      component: Building
    }, {
      path: '/progress',
      name: 'progress',
      component: Progress
    }, {
      path: '/management',
      name: 'management',
      component: Management
    }, {
      path: '/dataimport',
      name: 'dataimport',
      component: Dataimport
    }, {
      path: '/visualization',
      name: 'visualization',
      component: Visualization
    }, {
      path: '/version',
      name: 'version',
      component: Version
    }, {
      path: '/guration',
      name: 'guration',
      component: Guration
    }]
  }]
})
router.beforeEach((to, from, next) => {
  if (to.path != "/login") {
    var value = sessionStorage.getItem("login");
    if (value == undefined || value == null || value == "") {
      Message.error("您还没有登录请先登录");
      next("/login")
    }
    next();
  }
  next();
})
export default router