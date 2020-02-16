import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ja'
import './plugins/element.js'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI, {locale}, axios)
Vue.prototype.$axios = axios;

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
