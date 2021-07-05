import Vue from 'vue'
import VueRouter from 'vue-router'
import exampleRouter from './modules/example'

Vue.use(VueRouter)

const routes = [
  ...exampleRouter,
]

const router = new VueRouter({
  routes
})

export default router
