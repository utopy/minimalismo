import Vue from 'vue'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import Router from 'vue-router'
import VueAutosize from 'vue-autosize'
const Icon = require('vue-icon');
Vue.component('icon',Icon);

import App from './App'
import routes from './routes'
import mixin from './components/mixins'

Vue.use(Electron)
Vue.use(Resource)
Vue.use(Router)
Vue.use(VueAutosize)
Vue.config.debug = true;
Vue.directive('go-to', {
  
})

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

let mixins = {
  methods: {
    goHome: function(){
      $router.go({path: "landing-page"})
    }
  }
}

/* eslint-disable no-new */
let vm = new Vue({
  mixins: [mixin],
  router,
  ...App
}).$mount('#app')
