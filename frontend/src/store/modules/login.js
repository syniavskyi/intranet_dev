import axios from 'axios'
import router from '@/router/index.js'

const state = {
    loginError: false,
    sendEmailSuccess: false
}

const mutations = {
    AUTH_USER(state, token){
        state.idToken = token;
    },
    SET_LOGIN_ERROR(state, isError){
        state.loginError = isError
    },
    SET_EMAIL_SUCCESS(state, isSuccess){
        state.sendEmailSuccess = isSuccess
    }

}

const actions = {
    login({commit, dispatch}, authData) {
        commit('CLEAR_AUTH_DATA');
        const md5 = require('js-md5')
        var hashedPassword = md5(authData.password)
        var params = new URLSearchParams()
            params.append('grant_type', 'password')
            params.append('username', authData.username)
            params.append('password', hashedPassword)
        axios({
            method: 'post',
            url: 'oauth/token',
            auth: { username: 'vuejs-client', password: 'password' },
            headers: { "Content-type": "application/x-www-form-urlencoded; charset=utf-8" },
            data: params   
        }).then(res =>{
            console.log(res)
            commit('SET_LOGIN_ERROR', false)
            commit('AUTH_USER', res.data.access_token)
            localStorage.setItem('token', res.data.access_token)
            dispatch('setExpirationDate', res.data.expires_in)
            dispatch('setLogoutTimer', res.data.expires_in)
            dispatch('getUserRole', res.data.access_token)
            commit('DISPLAY_MENU', true);
            router.replace('/dashboard')
        }).catch(error => {
            console.log(error)
            commit('SET_LOGIN_ERROR', true)
        })
    },
    setLogoutTimer({commit, dispatch}, expirationTime) {
        setTimeout(() => {
            dispatch('logout')
        }, expirationTime * 1000)
    },
    setExpirationDate({commit}, expiresIn){
        const now = new Date()
        const expirationDate = new Date(now.getTime() + expiresIn * 1000)
        localStorage.setItem('expirationDate', expirationDate);
    },
    tryAutoLogin({commit}) {
        commit('SET_LOGIN_ERROR', false)
        const token = localStorage.getItem('token')
        if (!token) {
            return 
        }
        const expirationDate = localStorage.getItem('expirationDate')
        const now = new Date()
        if (now >= expirationDate) {
            return
        }
        commit('AUTH_USER', token )
        commit('DISPLAY_MENU', true);
        router.replace('/dashboard');
    },
    getUserRole({commit}, access_token){
        var URL = '/api/getCurrentRole?access_token=' + access_token
        axios.get(URL).then(res => {
            const role = res.data[0].authority
            localStorage.setItem('userRole', role)
            commit('SET_USER_ROLE', role)
        }).catch(error => {
            console.log(error)
        })
    },
    sendEmailWithPass({commit, dispatch, getters}, email) {
        dispatch('generatePassword')
        var params = new URLSearchParams()
            params.append('password', getters.hashedPassword)
            params.append('plain_password', getters.password)
            params.append('email', email)

        axios({
            method: 'post',
            url: '/api/user/password/reset',
            headers: { "Content-type": "application/x-www-form-urlencoded; charset=utf-8" },
            data: params   
        }).then(res => {
            commit('SET_EMAIL_SUCCESS', true)
        }).catch(error => {
            console.log(error)
        }) 
    }

}

const getters = {
    isAuthenticated (state) {
        return state.idToken !== null
    },
    isLoginError(state){
        return state.loginError
    },
    isSendEmailSuccess(state) {
        return state.sendEmailSuccess
    }      
}

export default {
    state,
    mutations,
    actions,
    getters
}