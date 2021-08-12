import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from "@/router";
import store from "./store/store";
import VueAxios from 'vue-axios'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'


// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

new Vue({
  router,
  store: store,
  render: h => h(App),
}).$mount('#app')
