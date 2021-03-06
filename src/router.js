import Vue from 'vue'
import Router from 'vue-router'
import description from '@/components/description'
import hitsGraph from '@/components/hits_graph'
import ballsGraph from '@/components/balls_graph'
import hitBallGraph from '@/components/hit_ball_graph'
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
        component: hitBallGraph
      },
      {
        path: '/ball',
        name: 'ball',
        component: ballsGraph
    },
    ]
  })
  export default router;