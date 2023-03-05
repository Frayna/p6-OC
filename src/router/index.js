import { createRouter, createWebHistory } from 'vue-router'
// @ts-ignore
import Home from '@/views/Home.vue'
// @ts-ignore
import Photographer from '@/views/Photographer.vue'
// @ts-ignore
import vueConfig from '@/vue.config'


const routes = [
  {
    path: vueConfig.publicPath,
    name: 'Home',
    component: Home
  },
  {
    path: vueConfig.publicPath + 'photographer/',
    name: 'Photographer',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // @ts-ignore
    //component: () => import(/* webpackChunkName: "about" */ '@/views/Photographer.vue')
    component: Photographer,
    props: true
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
