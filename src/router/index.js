import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from "@/components/Search";
import Library from "@/components/Library";
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Search
    },
    {
        path: '/library',
        name: 'Library',
        component: Library
    },
]

const router = new VueRouter({
    routes
})
export default router
