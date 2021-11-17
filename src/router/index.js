import {createRouter, createWebHistory} from "vue-router";
import Home from "@/views/Home"
import Login from "@/views/Login";

const routes = [
    {
        /*        这个path本来写的'/'，但希望它先判断（这是个异步网络操作）后再进入页面，故与'/'区分开,但问题是，
        '/'仍是会在第一时间被访问，而现在没有'/'这个路径
*/
        path: "/home",
        name: "Home",
        component: Home
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router