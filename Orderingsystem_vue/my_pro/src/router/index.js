import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login/login'
import main from '@/pages/main/main'
import { post } from '../utils/http'

Vue.use(Router)
const router = new Router({
    routes: [{
        path: '/',
        redirect: '/login'
    }, {
        path: '/login',
        name: 'login',
        component: login
    }, {
        path: '/main',
        name: 'main',
        component: main
    }]
})
router.beforeEach((to, from, next) => {
    console.log(localStorage.getItem("username"));
    console.log(to);
    if (to.name == login) next()
    else {
        post("/user/checkUser", { username: localStorage.getItem("username") }).then(res => {
            if (res.data.status == 0) next()
            else next('login')
        })
    }
    next();
})
export default router