import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import Login from '../views/Login.vue'
import PersonCenter from '../views/PersonCenter.vue'
import HotList from '../views/HotList.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'home',
  component: Home
},{
  path: '/search',
  name: 'Search',
  component: Search
}, {
  path: '/login',
  name: 'Login',
  component: Login
}, {
  path: '/person',
  name: 'PersonCenter',
  component: PersonCenter
}, {
  path: '/hotList/:webname/:weblocalname/:weblogo',
  name: 'HotList',
  component: HotList
}]

const router = new VueRouter({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router