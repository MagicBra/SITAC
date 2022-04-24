import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CampaignList from '../views/CampaignList.vue'
import CampaignDetail from '../views/CampaignDetail.vue'
import PakDetail from '../views/PakDetail.vue'
import MoaDetail from '../views/MoaDetail.vue'
import Profile from '../views/Profile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile
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
    path: '/campaigns/:idCampaign/paks/:id',
    name: 'PakDetail',
    component: PakDetail
  },
  {
    path: '/campaigns/:idCampaign/paks/:idPak/moas/:id',
    name: 'MoaDetail',
    component: MoaDetail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router