import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ja'

Vue.config.productionTip = false
Vue.use(ElementUI, {locale})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
