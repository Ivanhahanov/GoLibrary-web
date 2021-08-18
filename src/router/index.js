import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from "@/components/Search";
import Library from "@/components/Library";
import ContentLibrary from "@/components/ContentLibrary";
import Upload from "@/components/Upload";
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
    {
        path: '/content',
        name: 'ContentLibrary',
        component: ContentLibrary
    },
    {
        path: '/upload',
        name: 'Upload',
        component: Upload
    },
]

const router = new VueRouter({
    routes
})
export default router
