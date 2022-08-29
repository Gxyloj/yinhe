import { createRouter, createWebHistory } from 'vue-router'
import Home from "../views/Home/Home.vue";


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta:{title:'首页'}
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
