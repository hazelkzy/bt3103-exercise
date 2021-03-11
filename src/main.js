import Vue from 'vue'
import App from './App.vue'
import QuantityCounter from './components/QuantityCounter'
import PageContent from './components/PageContent'
import Routes from './routes.js'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.component('counter', QuantityCounter)
Vue.component('content', PageContent)
const myRouter = new VueRouter({
  routes: Routes,
  mode: 'history'
})

new Vue({
  render: h => h(App),
  router: myRouter
}).$mount('#app')
