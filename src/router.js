import Vue from 'vue'
import Router from 'vue-router'
import description from '@/components/description'
import hitsGraph from '@/components/hits_graph'
Vue.use(Router)
let router = new Router({
    mode:'history',
    routes: [
      { 
        path: '/',
        name: 'top',
        component: description
      },
      {
          path: '/hit',
          name: 'hit',
          component: hitsGraph
      },
      {
        path: '/hit/:id',
        name: 'hit-ball',
        //component: 'hit-ballGraph'
      },
      {
        path: '/ball',
        name: 'ball',
        //component: 'ballsGraph'
    },
    ]
  })
  export default router;