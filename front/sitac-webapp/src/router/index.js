import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Campaign from '../views/Campaign.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/campaigns',
    name: 'Campaign',
    component: Campaign
  },
  {
    path: '/campaigns/:id',
    name: 'Campaign',
    component: Campaign
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router