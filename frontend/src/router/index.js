import Vue from 'vue'
import Router from 'vue-router'

import store from '../store/store'

import Login from '@/components/auth/Login'
import Registration from '@/components/auth/Registration'

import Dashboard from '@/components/content/Dashboard'
import News from '@/components/content/News'
import Profile from '@/components/content/Profile'
import Employees from '@/components/content/Employees'
import Calendar from '@/components/Calendar/Calendar'
import Files from '@/components/content/Files'
import Informations from '@/components/content/Informations'

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
        component: Dashboard
        // beforeEnter: AuthGuard
    },
    {
        path: '/news',
        name: 'News',
        component: News
        // beforeEnter: AuthGuard
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
        // beforeEnter: AuthGuard
    },
    {
        path: '/employees',
        name: 'Employees',
        component: Employees
        // beforeEnter: AuthGuard
    },
    {
        path: '/informations',
        name: 'Informations',
        component: Informations
        // beforeEnter: AuthGuard
    },
    {
        path: '/files',
        name: 'Files',
        component: Files
        // beforeEnter: AuthGuard
    },
    {
        path: '/calendar',
        name: 'Calendar',
        component: Calendar
        // beforeEnter: AuthGuard
    }
]
})

