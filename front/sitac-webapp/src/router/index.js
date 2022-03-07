import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CampaignList from '../views/CampaignList.vue'
import CampaignDetail from '../views/CampaignDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/campaigns',
    name: 'CampaignList',
    component: CampaignList
  },
  {
    path: '/campaigns/:id',
    name: 'CampaignDetail',
    component: CampaignDetail
  },
  {
    path: '/create/campaigns/',
    name: 'CampaignDetail',
    component: CampaignDetail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router