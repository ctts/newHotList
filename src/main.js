import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
// 初始化css
import './assets/style/index.less'
// 使用ripple
import VueLongRipple from 'vue-long-ripple'
Vue.use(VueLongRipple)
// 使用store
import store from './store/index'
Vue.prototype.$store = store
// iconfont
import './assets/iconfont/iconfont'
// element
import './plugins/element.js'

Vue.config.productionTip = false

new Vue({
  router,
  data() {
    return {
      ImagePath: process.env.VUE_APP_PATH + 'static/webslogo/',
      userPath: process.env.VUE_APP_PATH + 'static/userHead/'
    }
  },
  render: h => h(App)
}).$mount('#app')