import Vue from 'vue'
import Router from 'vue-router'
const Test = r => require.ensure([], () => r(require('@/components/test.vue')), 'test')
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Test',
    component: Test
  }]
})
