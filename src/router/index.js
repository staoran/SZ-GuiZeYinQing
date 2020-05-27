import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/components/home/home"
import List from "@/components/list/list"
import Rigth from "@/components/rigth/rigth"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: "/home"
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children:[
        {
          path : "rigth",
          component:Rigth,
        },
        {
          path: 'list',
          component: List
        },
      ]
    }
  ]
})
