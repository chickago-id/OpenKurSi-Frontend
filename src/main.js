import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.prototype.$http = Axios;

const token = localStorage.getItem('user-token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}


Vue.use(BootstrapVue)

Vue.config.productionTip = false

Axios.defaults.baseURL = process.env.VUE_APP_ROOT_API;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
