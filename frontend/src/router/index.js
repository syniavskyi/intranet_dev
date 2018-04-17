import Vue from 'vue'
import Router from 'vue-router'

import store from '../store/store'

import Login from '@/components/auth/Login'
import Registration from '@/components/auth/Registration'
import Dashboard from '@/components/Dashboard'

import AuthGuard from './auth-guard'
import authGuard from './auth-guard';

Vue.use(Router)

export default new Router({
    // mode: 'history',
    routes: [{
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/registration',
        name: 'Registration',
        component: Registration
        // beforeEnter: AuthGuard
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        beforeEnter: AuthGuard
    },
    
]
})

