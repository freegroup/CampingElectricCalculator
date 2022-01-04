import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Overview',
    component: () => import(/* webpackChunkName: "overview" */ '@/views/Overview.vue')
  },
  {
    path: '/map',
    name: 'DefaultMap',
    component: () => import(/* webpackChunkName: "map" */ '@/views/Map.vue')
  },
  {
    path: '/map/:configuration',
    name: 'Map',
    component: () => import(/* webpackChunkName: "map" */ '@/views/Map.vue')
  },
  {
    path: '/list/:configuration',
    name: 'ShoppingList',
    component: () => import(/* webpackChunkName: "list" */ '@/views/ShoppingList.vue')
  },
  {
    path: '/diameter',
    name: 'WireDiameter',
    component: () => import(/* webpackChunkName: "diameter" */ '@/views/WireDiameter.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
