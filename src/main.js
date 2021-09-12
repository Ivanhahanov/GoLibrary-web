import Vue from 'vue'
import App from './App.vue'
import VueCookies from 'vue-cookies';
import axios from 'axios'
import router from "@/router";
import store from "./store/store";
import VueAxios from 'vue-axios'
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'


// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import https from "https";

Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueCookies)
Vue.config.productionTip = false
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL

// TODO: Remove this after add certs
axios.defaults.httpsAgent = new https.Agent({
    rejectUnauthorized: false, // (NOTE: this will disable client verification)
})


new Vue({
    router,
    store: store,
    render: h => h(App),
}).$mount('#app')
