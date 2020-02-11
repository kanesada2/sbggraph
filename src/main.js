import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ja'
import './plugins/element.js'

Vue.config.productionTip = false
Vue.use(ElementUI, {locale})

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
