// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {sync} from 'vuex-router-sync'
import 'babel-polyfill'

import './lib/css/global/_normalize.scss'
import './lib/css/global/_global.scss'
import 'mint-ui/lib/style.css'
import './lib/js/axios.config'

// 开发环境使用vConsole
if (process.env.NODE_ENV === 'development') {
  let VConsole = require('vconsole')
  new VConsole()
}
sync(store, router) // 同步vue-router的状态到vuex
Vue.config.productionTip = false

document.addEventListener('plusready', function () {
  //console.log("所有plus api都应该在此事件发生后调用，否则会出现plus is undefined。"
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
