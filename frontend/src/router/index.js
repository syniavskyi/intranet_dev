import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/auth/Login'
import Registration from '@/components/auth/Registration'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/registration',
        component: Registration
    }]
})