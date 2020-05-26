import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/components/home/home"
import List from "@/components/list/list"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/list',
      name: 'home',
      component: List
    },
  ]
})
