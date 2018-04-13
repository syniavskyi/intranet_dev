import axios from 'axios'
import router from '@/router/index.js'

const state = {
    idToken: null,
  	userId: null    
}

const mutations = {
    AUTH_USER(state, userData){
        state.idToken = userData.token;
        state.userId = userData.userId;
    },
    CLEAR_AUTH_DATA (state){
        state.idToken = null;
        state.userId = null;
    } 
}

const actions = {
    login({commit, dispatch}, authData) {
        
        var params = new URLSearchParams()
            params.append('grant_type', 'password')
            params.append('username', authData.username)
            params.append('password',authData.password)
        // axios.post('/oauth/token', {
        // // axios.post('/oauth/token?grant_type=password&username=mha&password=$2a$10$BC5wT8B8uSiPyWWQhYxmFuekdzDpUWnSPg4oPE2IQLSMJ/5EsXpD.', {
        //     auth: {
        //     username: 'vuejs-client',
        //     password: 'password'
        //     },
        //     headers: {
        //         "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
        //     },
        //     data: params
        axios({
            method: 'post',
            url: 'oauth/token',
            auth: {
            username: 'vuejs-client',
            password: 'password'
            },
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
            },
            data: params   
        }).then(res =>{
            console.log(res)
            // commit('AUTH_USER', {
            //     token: res.data.idToken,
            //     userId: res.data.localId
            // })
            // localStorage.setItem('token', res.data.idToken)
            // localStorage.setItem('userId', res.data.localId)
            // dispatch('setExpirationDate', res.data.expiresIn)
          	// dispatch('setLogoutTimer', res.data.expiresIn)
        }).catch(error => console.log(error))
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
        localStorage.removeItem('userId')
        localStorage.removeItem('token')
        router.replace('/signin');
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