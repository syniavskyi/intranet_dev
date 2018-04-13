import axios from 'axios'
import router from '@/router/index.js'

const state = {
    idToken: null,
}

const mutations = {
    AUTH_USER(state, userData){
        state.idToken = userData.token;
    },
    CLEAR_AUTH_DATA (state){
        state.idToken = null;
    } 
}

const actions = {
    login({commit, dispatch}, authData) {
        //password: $2a$10$BC5wT8B8uSiPyWWQhYxmFuekdzDpUWnSPg4oPE2IQLSMJ/5EsXpD.
        var params = new URLSearchParams()
            params.append('grant_type', 'password')
            params.append('username', authData.username)
            params.append('password',authData.password)
        axios({
            method: 'post',
            url: 'oauth/token',
            auth: {
            username: 'vuejs-client',
            password: 'password'
            },
            headers: { "Content-type": "application/x-www-form-urlencoded; charset=utf-8" },
            data: params   
        }).then(res =>{
            console.log(res)
            commit('AUTH_USER', {
                token: res.data.access_token,
            })
            localStorage.setItem('token', res.data.access_token)
            dispatch('setExpirationDate', res.data.expires_in)
            dispatch('setLogoutTimer', res.data.expires_in)
            router.replace('/dashboard')
        }).catch(error => {
            console.log(error)
            commit('CLEAR_AUTH_DATA');
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
    logout({commit}){
        commit('CLEAR_AUTH_DATA');
        localStorage.removeItem('expirationDate')
        localStorage.removeItem('token')
        router.replace('/signin');
    },
    tryAutoLogin({commit}) {
        const token = localStorage.getItem('token')
        if (!token) {
            return 
        }
        const expirationDate = localStorage.getItem('expirationDate')
        const now = new Date()
        if (now >= expirationDate) {
            return
        }
        commit('AUTH_USER', {
            token: token
        })
        router.replace('/dashboard');
    }
}

const getters = {
    isAuthenticated (state) {
        return state.idToken !== null
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}