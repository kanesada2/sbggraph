import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
let router = new Router({
    mode:'history',
    routes: [
      { 
        path: '/',
        //component: 'description'
      },
      {
          path: '/hit',
          //component: 'hitsGraph'
      },
      {
        path: '/hit/:id',
        name: 'hit-ball',
        //component: 'hit-ballGraph'
      },
      {
        path: '/ball',
       //component: 'ballsGraph'
    },
    ]
  })
  export default router;