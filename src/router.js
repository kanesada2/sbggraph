import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
let router = new Router({
    mode:'history',
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'active-link',
    routes: [
      { 
        path: '/',
      },
    ]
  })
  export default router;