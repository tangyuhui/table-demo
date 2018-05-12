// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import router from './router'
FastClick.attach(document.body)
Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(ElementUI)
/** i18n **/
let store = new Vuex.Store({
  modules: {
    i18n: vuexI18n.store
  }
})

Vue.use(vuexI18n.plugin, store)
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
