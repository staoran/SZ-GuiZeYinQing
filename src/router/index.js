import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/components/home/home"
import Custom from "@/components/custom/custom"
import homeRigth from "@/components/homeRigth/homeRigth"

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
          path : "homeRigth",
          component:homeRigth,
          meta: { keepAlive: true } //缓存当前页面信息
        },
        {
          path: 'custom',
          component: Custom
        },
      ]
    }
  ]
})
