import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/components/home/home"
import homeRigth from "@/components/homeRigth/homeRigth"
import Custom from "@/components/custom/custom"
import Fixed from "@/components/fixed/fixed"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: "/home/homeRigth"
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children:[
        {
          path : "homeRigth",
          name : "homeRigth",
          component:homeRigth,
          meta: { keepAlive: true } //缓存当前页面信息
        },
        {
          path: 'custom',
          name : "custom",
          component: Custom,
          meta: { keepAlive: true } //缓存当前页面信息
        },
        {
          path: 'fixed',
          name : "fixed",
          component: Fixed
        },
      ]
    }
  ]
})
